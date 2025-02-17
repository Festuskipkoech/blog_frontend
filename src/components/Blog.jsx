import React,{ useState } from "react";
import { Search, Moon, Sun, Heart, MessageCircle, Share2, Bookmark, Coffee } from 'lucide-react';
export default function Blog() {
    const [isDark, setIsDark] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Technology', 'Design', 'Travel', 'Lifestyle'];

    const posts = [
        {
          title: "The Future of Web Development",
          category: "Technology",
          author: "Alex Rivera",
          date: "Feb 15, 2025",
          readTime: "5 min read",
          image: "/api/placeholder/800/400",
          excerpt: "Exploring the latest trends in web development and what's coming next in the world of technology...",
          likes: 234,
          comments: 45
        },
        {
          title: "Minimalist Design Principles",
          category: "Design",
          author: "Sarah Chen",
          date: "Feb 14, 2025",
          readTime: "4 min read",
          image: "/api/placeholder/800/400",
          excerpt: "Understanding the core principles of minimalist design and how to apply them effectively...",
          likes: 189,
          comments: 32
        }
      ];
    

      return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
          {/* Header */}
          <header className="sticky top-0 z-50 backdrop-blur-lg bg-opacity-80 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coffee className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold">BlogVerse</span>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search articles..." 
                      className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                  
                  <button 
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </header>
    
          {/* Featured Post */}
          <section className="container mx-auto px-4 py-12">
            <div className="relative rounded-2xl overflow-hidden group">
              <img 
                src="/api/placeholder/1200/600" 
                alt="Featured post" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-8">
                  <span className="px-4 py-1 rounded-full bg-purple-600 text-white text-sm">Featured</span>
                  <h1 className="text-4xl font-bold text-white mt-4 mb-2">The Art of Creative Writing</h1>
                  <p className="text-gray-200 mb-4 max-w-2xl">Discover the secrets behind crafting compelling narratives that captivate readers...</p>
                  <div className="flex items-center space-x-4 text-white">
                    <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full" />
                    <span>By Emma Watson</span>
                    <span>•</span>
                    <span>Feb 16, 2025</span>
                    <span>•</span>
                    <span>8 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Categories */}
          <section className="container mx-auto px-4">
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeCategory === category 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>
    
          {/* Blog Posts Grid */}
          <section className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <article 
                  key={index}
                  className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-purple-600 text-white text-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src="/api/placeholder/32/32" alt={post.author} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{post.date} • {post.readTime}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button className="group-hover:text-purple-600 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="group-hover:text-purple-600 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className="group-hover:text-purple-600 transition-colors">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
    
          {/* Newsletter */}
          <section className="container mx-auto px-4 py-16">
            <div className="relative rounded-2xl overflow-hidden bg-purple-600 p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                  Get the latest articles, resources, and insights delivered directly to your inbox.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="px-8 py-3 bg-gray-900 text-white rounded-r-full hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
}
