import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI, promptAPI } from '../services/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [expandedLessons, setExpandedLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin()) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersResponse, lessonsResponse] = await Promise.all([
        authAPI.getAllUsers(),
        promptAPI.getAllLessons()
      ]);
      setUsers(usersResponse.data.users || []);
      setLessons(lessonsResponse.data.lessons || []);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
    setLoading(false);
  };

  const toggleLessonContent = (lessonId) => {
    setExpandedLessons((current) =>
      current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId]
    );
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">אין הרשאה</h2>
          <p className="text-gray-600 mb-4">דף זה מיועד למנהלים בלבד</p>
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            חזור לדאשבורד
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">פאנל אדמין</h1>
            <Link
              to="/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              חזור לדאשבורד
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                משתמשים ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lessons'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                שיעורים ({lessons.length})
              </button>
            </nav>
          </div>

          {/* Content */}
          {activeTab === 'users' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map(user => (
                  <li key={user.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-700 font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              {user.isAdmin && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  אדמין
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{user.phone}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          טלפון: {user.phone}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="space-y-4">
              {lessons.map(lesson => (
                <div key={lesson.id} className="bg-white shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {lesson.category?.name} - {lesson.subCategory?.name}
                          </p>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lesson.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {lesson.status === 'completed' ? 'הושלם' : 'בתהליך'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          משתמש: {lesson.user?.name} ({lesson.user?.phone})
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          בקשה: {lesson.promptText}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          נוצר: {new Date(lesson.createdAt).toLocaleDateString('he-IL')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => toggleLessonContent(lesson.id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {expandedLessons.includes(lesson.id) ? 'הסתר תוכן שיעור' : 'הצג תוכן שיעור'}
                      </button>
                      <span className="text-xs text-gray-500">
                        {expandedLessons.includes(lesson.id) ? 'מוצג תוכן' : 'לחץ להצגה'}
                      </span>
                    </div>
                    {expandedLessons.includes(lesson.id) && lesson.aiResponse && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">תוכן השיעור:</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {lesson.aiResponse}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;