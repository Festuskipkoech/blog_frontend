import React, { useState } from 'react';
import { 
  Book, 
  Sparkles, 
  Clock, 
  Heart, 
  Share2, 
  BookOpen,
  Moon,
  Sun,
  Coffee,
  Feather
} from 'lucide-react';

const BlogPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const posts = [
    {
      title: "The Art of Creative Writing",
      excerpt: "Discover the hidden secrets of crafting compelling narratives that captivate readers...",
      author: "Alexandra Rivers",
      date: "Feb 17, 2025",
      readTime: "6 min",
      likes: 234,
      category: "Creativity"
    },
    {
      title: "Mindful Living in a Digital Age",
      excerpt: "Exploring the balance between technology and consciousness in our modern world...",
      author: "Marcus Chen",
      date: "Feb 16, 2025",
      readTime: "4 min",
      likes: 189,
      category: "Lifestyle"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8" />
            <span className="text-2xl font-bold">CreativeMind</span>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </nav>
        
        <div className="container mx-auto px-6 py-16 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            Explore the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Creativity</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl">
            Where imagination meets insight, and ideas transform into inspiration.
          </p>
        </div>
      </header>

      {/* Featured Posts */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className={`
                relative overflow-hidden rounded-2xl p-6
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg hover:shadow-xl transition-all duration-300
                transform hover:-translate-y-1
              `}
            >
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              </div>

              <div className="flex items-center space-x-2 text-sm text-purple-500 mb-4">
                <Coffee className="w-4 h-4" />
                <span>{post.category}</span>
              </div>

              <h2 className="text-2xl font-bold mb-4 hover:text-purple-500 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Feather className="w-4 h-4 text-gray-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 hover:text-purple-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="hover:text-purple-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get weekly insights on creativity, productivity, and mindful living delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;