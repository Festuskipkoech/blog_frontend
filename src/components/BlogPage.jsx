import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, 
  Moon,
  Sun,
  Coffee,
  Feather,
  Newspaper,
  Clock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  MessageCircle,
  Share2,
  BookmarkPlus,
  ArrowUp,
  Menu,
  X,
  Home,
  Settings,
  Info,
  User,
  ExternalLink
} from 'lucide-react';

const BlogPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [content, setContent] = useState({ articles: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const articlesPerPage = 6;
  
  const headerRef = useRef(null);
  const scrollRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All News', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'politics', name: 'Politics', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'development', name: 'Development', icon: <Settings className="w-4 h-4" /> },
    { id: 'education', name: 'Education', icon: <Book className="w-4 h-4" /> },
  ];

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/content?page=${currentPage}&per_page=${articlesPerPage}`);
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshArticles = async () => {
    setIsRefreshing(true);
    try {
      await fetch('http://localhost:8000/api/scrape');
      await fetchContent();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      try {
        await fetch('http://localhost:8000/api/scrape');
        await fetchContent();
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    initialLoad();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchContent();
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Parallax effect for header
      if (headerRef.current) {
        const offset = window.scrollY;
        headerRef.current.style.transform = `translateY(${offset * 0.4}px)`;
        headerRef.current.style.opacity = Math.max(1 - offset / 700, 0.2);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPages = Math.ceil(content.total / articlesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Simulate a bookmark feature
  const handleBookmark = (e, articleId) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, you would save to user's bookmarks
    console.log(`Bookmarked article ${articleId}`);
  };

  // Shimmer loading effect component
  const ShimmerEffect = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`
          rounded-2xl overflow-hidden
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-lg
        `}>
          <div className="animate-pulse">
            <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-600"></div>
            <div className="p-6">
              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-20 w-full bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading && content.articles.length === 0) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-transparent border-b-pink-500 border-l-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-purple-500 animate-spin-slow"></div>
              <Newspaper className="absolute inset-0 m-auto w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-3xl font-bold animate-pulse">Loading Kang'ata News...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        <div className="p-8 max-w-md rounded-xl bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <X className="w-6 h-6 mr-2" />
            Something went wrong!
          </h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={refreshArticles}
            className="px-4 py-2 bg-red-200 dark:bg-red-800 rounded-lg hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Hero Header with Parallax Effect */}
      <header 
        ref={headerRef}
        className="relative h-96 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIj48L3JlY3Q+PC9zdmc+')]"></div>
        
        {/* Top Navigation Bar */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <Book className="relative w-10 h-10 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Kang'ata News</span>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  pl-10 pr-4 py-2 rounded-full 
                  bg-white/20 backdrop-blur-sm text-white placeholder-white/70
                  border border-white/30 outline-none
                  transition-all duration-300
                  ${isSearchFocused ? 'w-64 border-white' : 'w-48'}
                `}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
            </div>
            
            <button
              onClick={refreshArticles}
              disabled={isRefreshing}
              className={`
                p-2 rounded-full 
                bg-white/20 backdrop-blur-sm
                hover:bg-white/30 
                transition-colors duration-300
                ${isRefreshing ? 'opacity-50' : ''}
              `}
              title="Refresh Articles"
            >
              <RefreshCw className={`w-6 h-6 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="
                p-2 rounded-full 
                bg-white/20 backdrop-blur-sm
                hover:bg-white/30 
                transition-colors duration-300
              "
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? 
                <Sun className="w-6 h-6 text-white transition-transform hover:rotate-90 duration-500" /> : 
                <Moon className="w-6 h-6 text-white transition-transform hover:rotate-90 duration-500" />
              }
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/20 backdrop-blur-sm text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        
        {/* Hero Content */}
        <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
            <span className="inline-block animate-float-slow">Latest </span>
            <span className="inline-block animate-float-slower bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">News Updates</span>
          </h1>
          <p className="text-xl text-white text-center max-w-2xl mb-8 drop-shadow">
            Stay informed with the latest articles and updates about Governor Irungu Kang'ata and Murang'a County developments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="px-6 py-3 bg-white text-purple-600 font-bold rounded-full 
                hover:bg-purple-50 transform hover:scale-105 transition-all duration-300
                flex items-center gap-2 shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              Official Website
            </button>
            <button 
              className="px-6 py-3 bg-purple-700 text-white font-bold rounded-full 
                hover:bg-purple-800 transform hover:scale-105 transition-all duration-300
                flex items-center gap-2 shadow-lg"
            >
              <User className="w-5 h-5" />
              Subscribe to Updates
            </button>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill={isDarkMode ? "#111827" : "#F9FAFB"}>
            <path d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,80C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-gray-900/95 flex flex-col p-6 md:hidden animate-fade-in">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <Book className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">Kang'ata News</span>
            </div>
            <button className="p-2 text-white" onClick={() => setShowMobileMenu(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
            />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          </div>
          
          <nav className="flex flex-col space-y-4 mb-auto">
            <a href="#" className="flex items-center space-x-3 text-white text-lg py-3 px-4 rounded-lg bg-purple-700">
              <Home className="w-6 h-6" />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white text-lg py-3 px-4 rounded-lg hover:bg-gray-800">
              <Newspaper className="w-6 h-6" />
              <span>Categories</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white text-lg py-3 px-4 rounded-lg hover:bg-gray-800">
              <BookmarkPlus className="w-6 h-6" />
              <span>Saved News</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-white text-lg py-3 px-4 rounded-lg hover:bg-gray-800">
              <Info className="w-6 h-6" />
              <span>About</span>
            </a>
          </nav>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-full bg-gray-800 text-white"
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button 
              onClick={refreshArticles}
              className="p-3 rounded-full bg-gray-800 text-white"
            >
              <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-6 py-12">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-10 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full 
                  flex items-center space-x-2
                  transition-all duration-300 transform
                  ${activeCategory === category.id 
                    ? `${isDarkMode ? 'bg-purple-700' : 'bg-purple-600'} text-white shadow-lg scale-105` 
                    : `${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} hover:shadow`}
                `}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Article (First article gets special treatment) */}
        {content.articles.length > 0 && (
          <div className="mb-16">
            <article 
              className={`
                relative overflow-hidden rounded-2xl 
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-xl hover:shadow-2xl transition-all duration-500
                transform hover:-translate-y-1
              `}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 text-purple-500 mb-4 md:mb-0">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                      <Newspaper className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Featured Article</span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                      Politics
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Murang'a County
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 hover:text-purple-500 transition-colors">
                  <a href={content.articles[0].url} target="_blank" rel="noopener noreferrer">
                    {content.articles[0].title}
                  </a>
                </h2>

                <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {content.articles[0].content}
                </p>

                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                        {content.articles[0].author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{content.articles[0].author}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(content.articles[0].date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                      onClick={(e) => handleBookmark(e, content.articles[0].id)}>
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}
        
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Newspaper className="w-8 h-8 mr-2 text-purple-500" />
          Latest News Updates
        </h2>
        
        {isLoading ? (
          <ShimmerEffect />
        ) : content.articles.length === 0 ? (
          <div className={`
            p-6 rounded-lg text-center
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}>
            <div className="mb-4">
              <Newspaper className="w-16 h-16 mx-auto text-gray-400" />
            </div>
            <p className="text-lg">No articles found at the moment. Please check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.articles.slice(1).map((article, index) => (
                <article 
                  key={index}
                  className={`
                    group relative overflow-hidden rounded-2xl
                    ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                    shadow-lg hover:shadow-xl transition-all duration-300
                    transform hover:-translate-y-1
                    border border-transparent hover:border-purple-200 dark:hover:border-purple-900
                  `}
                >
                  {/* Decorative slash pattern at the top */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-sm text-purple-500">
                        <Coffee className="w-4 h-4" />
                        <span>News Article</span>
                      </div>
                      
                      <span className="
                        px-2 py-1 rounded-full text-xs font-medium 
                        bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ">
                        {index % 3 === 0 ? 'Politics' : index % 3 === 1 ? 'Development' : 'Education'}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-4 group-hover:text-purple-500 transition-colors line-clamp-2">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h2>

                    <p className={`mb-6 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {article.content}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Feather className="w-4 h-4 text-gray-500" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button 
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                        onClick={(e) => handleBookmark(e, article.id)}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Reveal gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </article>
              ))}
            </div>
            
            {content.total > articlesPerPage && (
              <div className="mt-12 flex justify-center items-center">
                <div className={`
                  flex items-center space-x-2 rounded-full p-1
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg
                `}>
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`
                      p-2 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'} hover:text-purple-600`}
                    `}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        scrollToTop();
                      }}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-300${currentPage === i + 1
                          ? `${isDarkMode ? 'bg-purple-700' : 'bg-purple-600'} text-white font-bold`
                          : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'} hover:text-purple-600`}
                      `}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`
                      p-2 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${currentPage === totalPages 
                        ? 'opacity-50 cursor-not-allowed' 
                        : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-purple-100'} hover:text-purple-600`}
                    `}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Newsletter Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-purple-50'}`}>
        <div className="container mx-auto px-6">
          <div className={`
            rounded-2xl overflow-hidden shadow-xl
            ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
            relative
          `}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)"></rect>
              </svg>
            </div>
            
            <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Stay updated with <span className="text-purple-500">Kang'ata News</span>
                </h2>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Subscribe to our newsletter to receive the latest updates, exclusive stories, and breaking news about Murang'a County developments directly to your inbox.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Weekly digests', 'Breaking news alerts', 'Exclusive interviews', 'Development updates'].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-purple-500 mr-3"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:w-1/2 w-full">
                <div className={`
                  rounded-xl p-6 md:p-8
                  border ${isDarkMode ? 'border-gray-700' : 'border-purple-100'}
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                `}>
                  <h3 className="text-2xl font-bold mb-4">Subscribe Now</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        className={`
                          w-full px-4 py-3 rounded-lg 
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600 placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-200 placeholder-gray-400'}
                          border focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          transition-all duration-300
                        `}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className={`
                          w-full px-4 py-3 rounded-lg 
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600 placeholder-gray-400' 
                            : 'bg-gray-50 border-gray-200 placeholder-gray-400'}
                          border focus:ring-2 focus:ring-purple-500 focus:border-transparent
                          transition-all duration-300
                        `}
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="
                          w-full py-3 px-4 rounded-lg
                          bg-gradient-to-r from-purple-600 to-pink-600
                          text-white font-medium
                          hover:from-purple-700 hover:to-pink-700
                          focus:ring-4 focus:ring-purple-500/50
                          transform hover:translate-y-[-2px]
                          transition-all duration-300
                        "
                      >
                        Subscribe to Newsletter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Book className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Kang'ata News</span>
              </div>
              <p className={`max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your trusted source for the latest news and updates about Governor Irungu Kang'ata and Murang'a County developments.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {['Home', 'About', 'Contact', 'Privacy Policy'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className={`hover:text-purple-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {['Politics', 'Development', 'Education', 'Economy'].map((item, index) => (
                    <li key={index}>
                      <a href="#" className={`hover:text-purple-500 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'instagram', 'youtube'].map((platform, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="
                        w-10 h-10 rounded-full 
                        flex items-center justify-center
                        border border-gray-300 dark:border-gray-700
                        hover:bg-purple-500 hover:border-transparent hover:text-white
                        transition-all duration-300
                      "
                    >
                      <span className="sr-only">{platform}</span>
                      {/* Simple text abbreviation as placeholder for social icons */}
                      <span className="uppercase">{platform.charAt(0)}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Kang'ata News Updates. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-8 right-8 z-30
            p-3 rounded-full shadow-lg
            bg-purple-600 text-white
            hover:bg-purple-700
            transform hover:scale-110
            transition-all duration-300
            animate-bounce-slow
          "
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// Add these custom animations to your CSS or tailwind config
const customStyles = `
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes float-slower {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(-5%); }
  50% { transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-float-slow {
  animation: float-slow 3s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 5s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

export default BlogPage;