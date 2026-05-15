import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { categoryAPI, promptAPI } from '../services/api';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadUserLessons();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data?.categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadUserLessons = async () => {
    try {
      const response = await promptAPI.getUserLessons();
      setLessons(response.data.lessons || []);
    } catch (error) {
      console.error('Error loading lessons:', error);
    }
  };

  const selectedCategoryData = Array.isArray(categories)
    ? categories.find(cat => cat.id === selectedCategory)
    : undefined;

  const selectedSubCategoryData = selectedCategoryData?.subCategories
    ? selectedCategoryData.subCategories.find(sub => sub.id === selectedSubCategory)
    : undefined;

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!selectedCategoryData || !selectedSubCategoryData) {
      setError('עליך לבחור קטגוריה ותת-קטגוריה.');
      setLoading(false);
      return;
    }

    try {
      await promptAPI.createLesson({
        category: selectedCategoryData,
        subCategory: selectedSubCategoryData,
        categoryId: selectedCategoryData.id,
        subCategoryId: selectedSubCategoryData.id,
        prompt,
        promptText: prompt,
      });

      setPrompt('');
      setSelectedCategory('');
      setSelectedSubCategory('');
      loadUserLessons();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'שגיאה ביצירת השיעור'
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">לומדים עם AI</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">שלום, {user?.name}</span>
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  פאנל אדמין
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                התנתק
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Lesson Form */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  צור שיעור חדש
                </h3>
                <form onSubmit={handleCreateLesson} className="space-y-4">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      קטגוריה
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSelectedCategory(value === '' ? '' : Number(value));
                        setSelectedSubCategory('');
                      }}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    >
                      <option value="">בחר קטגוריה</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCategoryData?.subCategories?.length > 0 && (
                    <div>
                      <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700">
                        תת-קטגוריה
                      </label>
                      <select
                        id="subCategory"
                        value={selectedSubCategory}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedSubCategory(value === '' ? '' : Number(value));
                        }}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      >
                        <option value="">בחר תת-קטגוריה</option>
                        {selectedCategoryData.subCategories.map(sub => (
                          <option key={sub.id} value={sub.id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                      בקשה לשיעור
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="תאר את השיעור שברצונך ליצור..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {loading ? 'יוצר שיעור...' : 'צור שיעור'}
                  </button>
                </form>
              </div>
            </div>

            {/* Lessons History */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  השיעורים שלי
                </h3>
                <div className="space-y-4">
                  {lessons.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">אין שיעורים עדיין</p>
                  ) : (
                    lessons.map(lesson => (
                      <div key={lesson.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {lesson.category?.name} - {lesson.subCategory?.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {lesson.promptText}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              נוצר ב: {new Date(lesson.createdAt).toLocaleDateString('he-IL')}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            lesson.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {lesson.status === 'completed' ? 'הושלם' : 'בתהליך'}
                          </span>
                        </div>
                        {lesson.aiResponse && (
                          <div className="mt-4 p-3 bg-gray-50 rounded">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {lesson.aiResponse}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;