// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   Download,
//   Calendar,
//   User,
//   Tag,
//   Eye,
//   Filter,
//   FileText,
//   Video,
//   ImageIcon,
//   BookOpen,
// } from "lucide-react";

// const Resources = () => {
//   const [activeResourceFilter, setActiveResourceFilter] = useState("all");
//   const [activeBlogFilter, setActiveBlogFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isBlogFilterVisible, setIsBlogFilterVisible] = useState(false);
//   const blogSectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsBlogFilterVisible(entry.isIntersecting);
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold: 0.2,
//       }
//     );

//     if (blogSectionRef.current) {
//       observer.observe(blogSectionRef.current);
//     }

//     return () => {
//       if (blogSectionRef.current) {
//         observer.unobserve(blogSectionRef.current);
//       }
//     };
//   }, []);

//   const resources = [
//     {
//       id: 1,
//       title: "WASH Implementation Guide for Communities",
//       type: "PDF Guide",
//       category: "WASH",
//       description:
//         "Comprehensive guide on implementing water, sanitation, and hygiene programs in rural communities.",
//       downloadUrl: "/path/to/wash-guide.pdf",
//       fileSize: "2.5 MB",
//       date: "2025-01-15",
//       image:
//         "https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <FileText className="w-6 h-6 text-blue-600" />,
//     },
//     {
//       id: 2,
//       title: "NCDs Prevention in Rural Settings",
//       type: "Research Paper",
//       category: "NCDs",
//       description:
//         "Evidence-based strategies for preventing non-communicable diseases in underserved communities.",
//       downloadUrl: "/ncds-research-paper.pdf",
//       fileSize: "1.8 MB",
//       date: "2025-01-12",
//       image:
//         "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <FileText className="w-6 h-6 text-red-600" />,
//     },
//     {
//       id: 3,
//       title: "Community Health Education Workshop",
//       type: "Video Training",
//       category: "Training",
//       description:
//         "90-minute training session on effective community health education methods and techniques.",
//       downloadUrl: "/path/to/health-workshop.mp4",
//       fileSize: "450 MB",
//       date: "2025-01-10",
//       image:
//         "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <Video className="w-6 h-6 text-purple-600" />,
//     },
//     {
//       id: 4,
//       title: "Hygiene Practices Infographic",
//       type: "Infographic",
//       category: "WASH",
//       description:
//         "Visual guide to proper handwashing and hygiene practices for community distribution.",
//       downloadUrl: "/path/to/hygiene-infographic.png",
//       fileSize: "5.2 MB",
//       date: "2025-01-08",
//       image:
//         "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <ImageIcon className="w-6 h-6 text-green-600" />,
//     },
//     {
//       id: 5,
//       title: "Diabetes Screening Protocol",
//       type: "Protocol Document",
//       category: "NCDs",
//       description:
//         "Standardized protocol for conducting community diabetes screening programs.",
//       downloadUrl: "/path/to/diabetes-protocol.pdf",
//       fileSize: "1.2 MB",
//       date: "2025-01-05",
//       image:
//         "https://images.pexels.com/photos/4047273/pexels-photo-4047273.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <FileText className="w-6 h-6 text-red-600" />,
//     },
//     {
//       id: 6,
//       title: "Water Quality Testing Handbook",
//       type: "Technical Manual",
//       category: "WASH",
//       description:
//         "Step-by-step guide for conducting water quality tests using portable equipment.",
//       downloadUrl: "/path/to/water-quality-handbook.pdf",
//       fileSize: "3.1 MB",
//       date: "2025-01-03",
//       image:
//         "https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=300",
//       icon: <BookOpen className="w-6 h-6 text-blue-600" />,
//     },
//   ];

//   const blogPosts = [
//     {
//       title: "Success Story: Transforming Health Outcomes in Kalesirua Village",
//       excerpt:
//         "How our WASH program reduced waterborne diseases by 40% in just 18 months through community-led initiatives.",
//       author: "Dr. Solomon Ole Ntiati",
//       date: "2025-01-15",
//       readTime: "5 min read",
//       image:
//         "https://images.pexels.com/photos/6994820/pexels-photo-6994820.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Success Stories",
//       isFeatured: true, 
//     },
//     {
//       title: "The Role of Community Health Promoters in NCDs Prevention",
//       excerpt:
//         "Exploring how trained community health workers are bridging the gap between formal healthcare and rural communities.",
//       author: "Joseph Sankale",
//       date: "2025-01-12",
//       readTime: "7 min read",
//       image:
//         "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Health Education",
//     },
//     {
//       title: "Building Sustainable Sanitation Infrastructure: Lessons Learned",
//       excerpt:
//         "Key insights from our school sanitation projects and how community ownership ensures long-term success.",
//       author: "Mary Nasieku",
//       date: "2025-01-10",
//       readTime: "6 min read",
//       image:
//         "https://images.pexels.com/photos/8363018/pexels-photo-8363018.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Infrastructure",
//     },
//     {
//       title: "Early Detection Saves Lives: Our NCDs Screening Program Impact",
//       excerpt:
//         "Data from our latest screening camps shows the critical importance of community-based health interventions.",
//       author: "Dr. Peter Lemayian",
//       date: "2025-01-08",
//       readTime: "4 min read",
//       image:
//         "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Health Data",
//     },
//     {
//       title: "Empowering Communities Through Health Education",
//       excerpt:
//         "How our door-to-door education programs are creating lasting behavioral changes in hygiene practices.",
//       author: "Grace Sankale",
//       date: "2025-01-05",
//       readTime: "5 min read",
//       image:
//         "https://images.pexels.com/photos/7551726/pexels-photo-7551726.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Community Engagement",
//     },
//     {
//       title: "Partnership Impact: Working with Local Government",
//       excerpt:
//         "How collaboration with county health services has amplified our reach and impact in both operational wards.",
//       author: "John Kiprotich",
//       date: "2025-01-03",
//       readTime: "8 min read",
//       image:
//         "https://images.pexels.com/photos/6995104/pexels-photo-6995104.jpeg?auto=compress&cs=tinysrgb&w=400",
//       category: "Partnerships",
//     },
//   ];

//   const resourceCategories = [
//     { label: "All Resources", value: "all", color: "text-gray-600" },
//     { label: "WASH", value: "WASH", color: "text-blue-600" },
//     { label: "NCDs", value: "NCDs", color: "text-red-600" },
//     { label: "Training", value: "Training", color: "text-purple-600" },
//   ];

//   const blogCategories = [
//     { label: "All", value: "all" },
//     { label: "Success Stories", value: "Success Stories" },
//     { label: "Health Education", value: "Health Education" },
//     { label: "Infrastructure", value: "Infrastructure" },
//     { label: "Partnerships", value: "Partnerships" },
//     { label: "Health Data", value: "Health Data" },
//     { label: "Community Engagement", value: "Community Engagement" },
//   ];

//   const filteredResources = resources.filter((resource) => {
//     const matchesCategory =
//       activeResourceFilter === "all" ||
//       resource.category === activeResourceFilter;
//     const matchesSearch =
//       resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const filteredBlogPosts = blogPosts.filter((post) => {
//     const matchesCategory =
//       activeBlogFilter === "all" || post.category === activeBlogFilter;
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const featuredPost = filteredBlogPosts.find((post) => post.isFeatured);
//   const otherBlogPosts = filteredBlogPosts.filter((post) => !post.isFeatured);

//   return (
//     <div className="pt-16 lg:pt-20">
//       {/* Hero Banner */}
//       <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.pexels.com/photos/159751/book-reading-reading-a-book-girl-159751.jpeg?auto=compress&cs=tinysrgb&w=1920"
//             alt="Resources"
//             className="w-full h-full object-cover opacity-20"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
//             Resources & Insights
//           </h1>
//           <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
//             Access our library of resources, research findings, and community
//             stories to support health initiatives.
//           </p>
//         </div>
//       </section>

//       {/* Dynamic Search and Filter Bar */}
//       <section className="py-12 bg-white sticky top-16 lg:top-20 z-40 shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Conditional rendering based on scroll position */}
//           {!isBlogFilterVisible ? (
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               {/* Search */}
//               <div className="relative max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search resources..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                 />
//               </div>
//               {/* Filter Tabs for Resources */}
//               <div className="flex flex-wrap gap-2">
//                 {resourceCategories.map((category) => (
//                   <button
//                     key={category.value}
//                     onClick={() => setActiveResourceFilter(category.value)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                       activeResourceFilter === category.value
//                         ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     <Filter className="w-4 h-4 inline-block mr-2" />
//                     {category.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               {/* Search */}
//               <div className="relative w-full lg:max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search articles..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                 />
//               </div>
//               {/* Filter Tabs for Blog */}
//               <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
//                 {blogCategories.map((category) => (
//                   <button
//                     key={category.value}
//                     onClick={() => setActiveBlogFilter(category.value)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                       activeBlogFilter === category.value
//                         ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {category.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Downloadable Resources */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Downloadable Materials
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Access our library of guides, protocols, and educational materials
//               to support your health initiatives.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredResources.map((resource) => (
//               <div
//                 key={resource.id}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
//               >
//                 <div className="relative h-48">
//                   <img
//                     src={resource.image}
//                     alt={resource.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                   <div className="absolute bottom-4 left-4 text-white">
//                     <div className="flex items-center space-x-2">
//                       {resource.icon}
//                       <span className="text-sm font-medium">
//                         {resource.type}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         resource.category === "WASH"
//                           ? "bg-blue-100 text-blue-700"
//                           : resource.category === "NCDs"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-purple-100 text-purple-700"
//                       }`}
//                     >
//                       <Tag className="w-3 h-3 inline-block mr-1" />
//                       {resource.category}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       {new Date(resource.date).toLocaleDateString()}
//                     </span>
//                   </div>

//                   <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
//                     {resource.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 leading-relaxed">
//                     {resource.description}
//                   </p>

//                   <div className="flex items-center justify-end text-xs text-gray-500 mb-4">
//                     <span>{resource.fileSize}</span>
//                   </div>

//                   <a
//                     href={resource.downloadUrl}
//                     download
//                     className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
//                   >
//                     <Download className="w-4 h-4 mr-2" />
//                     <span className="hidden sm:inline">Download Resource</span>
//                     <span className="sm:hidden">Download</span>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredResources.length === 0 && (
//             <div className="text-center py-12">
//               <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Search className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 No resources found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search terms or filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Blog Section */}
//       <section ref={blogSectionRef} className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               Latest Insights & Stories
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Read about our work, impact stories, and insights from the field
//               of community health.
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {/* Featured Post */}
//             {featuredPost && (
//               <div className="lg:col-span-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
//                 <div className="md:flex">
//                   <div className="md:w-1/2">
//                     <img
//                       src={featuredPost.image}
//                       alt={featuredPost.title}
//                       className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <div className="md:w-1/2 p-8 lg:p-12 text-white">
//                     <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-4">
//                       <span className="text-sm font-medium">Featured Story</span>
//                     </div>
//                     <h3 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-teal-100 transition-colors cursor-pointer">
//                       {featuredPost.title}
//                     </h3>
//                     <p className="text-teal-100 mb-6 leading-relaxed">
//                       {featuredPost.excerpt}
//                     </p>
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                       <div className="flex items-center text-sm">
//                         <User className="w-4 h-4 mr-2" />
//                         {featuredPost.author}
//                       </div>
//                       <div className="flex items-center text-sm">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         {new Date(featuredPost.date).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <button className="mt-6 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200">
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Regular Posts */}
//             {otherBlogPosts.map((post, index) => (
//               <article
//                 key={index}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
//               >
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
//                       {post.category}
//                     </span>
//                     <div className="flex items-center text-xs text-gray-500">
//                       <Eye className="w-3 h-3 mr-1" />
//                       {post.readTime}
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors cursor-pointer line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
//                     {post.excerpt}
//                   </p>

//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500 mb-4">
//                     <div className="flex items-center">
//                       <User className="w-4 h-4 mr-1" />
//                       {post.author}
//                     </div>
//                     <div className="flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {new Date(post.date).toLocaleDateString()}
//                     </div>
//                   </div>

//                   <button className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-teal-50 hover:text-teal-700 transition-all duration-200">
//                     Read More
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {filteredBlogPosts.length === 0 && (
//             <div className="text-center py-12">
//               <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Search className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 No articles found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search terms or filters.
//               </p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Newsletter Signup */}
//       <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
//           <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
//             Subscribe to our newsletter to receive the latest resources,
//             research findings, and community impact stories.
//           </p>
//           <div className="max-w-md mx-auto flex gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
//             />
//             <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Resources;
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Download,
  Calendar,
  User,
  Tag,
  Eye,
  Filter,
  FileText,
  Video,
  ImageIcon,
  BookOpen,
  Clock,
} from "lucide-react";

const Resources = () => {
  const [activeResourceFilter, setActiveResourceFilter] = useState("all");
  const [activeBlogFilter, setActiveBlogFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlogFilterVisible, setIsBlogFilterVisible] = useState(false);
  const blogSectionRef = useRef(null);
  const [expandedPosts, setExpandedPosts] = useState(new Set());

  const togglePostExpansion = (postId) => {
    const newExpandedPosts = new Set(expandedPosts);
    if (newExpandedPosts.has(postId)) {
      newExpandedPosts.delete(postId);
    } else {
      newExpandedPosts.add(postId);
    }
    setExpandedPosts(newExpandedPosts);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBlogFilterVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (blogSectionRef.current) {
      observer.observe(blogSectionRef.current);
    }

    return () => {
      if (blogSectionRef.current) {
        observer.unobserve(blogSectionRef.current);
      }
    };
  }, []);

  const resources = [
    {
      id: 1,
      title: "WASH Implementation Guide for Communities",
      type: "PDF Guide",
      category: "WASH",
      description:
        "Comprehensive guide on implementing water, sanitation, and hygiene programs in rural communities.",
      downloadUrl: "/path/to/wash-guide.pdf",
      fileSize: "2.5 MB",
      date: "2025-01-15",
      image:
        "https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
    },
    {
      id: 2,
      title: "NCDs Prevention in Rural Settings",
      type: "Research Paper",
      category: "NCDs",
      description:
        "Evidence-based strategies for preventing non-communicable diseases in underserved communities.",
      downloadUrl: "/ncds-research-paper.pdf",
      fileSize: "1.8 MB",
      date: "2025-01-12",
      image:
        "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <FileText className="w-6 h-6 text-red-600" />,
    },
    {
      id: 3,
      title: "Community Health Education Workshop",
      type: "Video Training",
      category: "Training",
      description:
        "90-minute training session on effective community health education methods and techniques.",
      downloadUrl: "/path/to/health-workshop.mp4",
      fileSize: "450 MB",
      date: "2025-01-10",
      image:
        "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <Video className="w-6 h-6 text-purple-600" />,
    },
    {
      id: 4,
      title: "Hygiene Practices Infographic",
      type: "Infographic",
      category: "WASH",
      description:
        "Visual guide to proper handwashing and hygiene practices for community distribution.",
      downloadUrl: "/path/to/hygiene-infographic.png",
      fileSize: "5.2 MB",
      date: "2025-01-08",
      image:
        "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <ImageIcon className="w-6 h-6 text-green-600" />,
    },
    {
      id: 5,
      title: "Diabetes Screening Protocol",
      type: "Protocol Document",
      category: "NCDs",
      description:
        "Standardized protocol for conducting community diabetes screening programs.",
      downloadUrl: "/path/to/diabetes-protocol.pdf",
      fileSize: "1.2 MB",
      date: "2025-01-05",
      image:
        "https://images.pexels.com/photos/4047273/pexels-photo-4047273.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <FileText className="w-6 h-6 text-red-600" />,
    },
    {
      id: 6,
      title: "Water Quality Testing Handbook",
      type: "Technical Manual",
      category: "WASH",
      description:
        "Step-by-step guide for conducting water quality tests using portable equipment.",
      downloadUrl: "/path/to/water-quality-handbook.pdf",
      fileSize: "3.1 MB",
      date: "2025-01-03",
      image:
        "https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=300",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Success Story: Transforming Health Outcomes in Kalesirua Village",
      excerpt:
        "How our WASH program reduced waterborne diseases by 40% in just 18 months through community-led initiatives.",
      fullContent: `<p class="mb-4">Kalesirua, a small village nestled in the heart of rural Kenya, was once plagued by recurrent outbreaks of waterborne diseases. Access to clean water was scarce, and sanitation practices were poor. In early 2023, our organization launched a comprehensive WASH (Water, Sanitation, and Hygiene) program, not as an external aid project, but as a community-led initiative.</p>
        <p class="mb-4">The core of our strategy was empowerment. We worked alongside local leaders to form a village health committee, training them on basic water purification techniques, building latrines, and promoting proper handwashing. The committee, in turn, became the champions of change, educating their neighbors and mobilizing them to build sanitation facilities using locally available materials.</p>
        <p class="mb-4">The results were nothing short of remarkable. After just 18 months, our post-implementation survey showed a staggering 40% reduction in reported cases of typhoid and cholera. The village, once dependent on external assistance, now boasts several community-managed boreholes and a sustainable sanitation system. This success story stands as a testament to the power of empowering communities to solve their own health challenges.</p>`,
      author: "Dr. Solomon Ole Ntiati",
      date: "2025-01-15",
      readTime: "5 min read",
      image:
        "https://images.pexels.com/photos/6994820/pexels-photo-6994820.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Success Stories",
      isFeatured: true,
    },
    {
      id: 2,
      title: "The Role of Community Health Promoters in NCDs Prevention",
      excerpt:
        "Exploring how trained community health workers are bridging the gap between formal healthcare and rural communities.",
      fullContent: `<p class="mb-4">Non-communicable diseases (NCDs) like diabetes and hypertension are often called 'silent killers,' especially in rural settings where access to medical facilities is limited. Our Community Health Promoters (CHPs) are on the front lines, acting as the vital link between isolated communities and the formal healthcare system. Their role extends far beyond simple check-ups.</p>
        <p class="mb-4">Equipped with a basic medical kit and a tablet for data collection, our CHPs conduct door-to-door screenings for early signs of NCDs. They educate families on healthy eating, the importance of physical activity, and the dangers of tobacco and alcohol. They also facilitate referrals, ensuring that individuals who screen positive for conditions receive timely care at a local clinic or hospital.</p>
        <p class="mb-4">This grassroots approach is crucial. By building trust and providing personalized advice, CHPs are changing behaviors and saving lives. Their presence in the community demystifies complex health issues and provides a consistent source of support, proving that effective healthcare starts right at the doorstep.</p>`,
      author: "Joseph Sankale",
      date: "2025-01-12",
      readTime: "7 min read",
      image:
        "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Health Education",
    },
    {
      id: 3,
      title: "Building Sustainable Sanitation Infrastructure: Lessons Learned",
      excerpt:
        "Key insights from our school sanitation projects and how community ownership ensures long-term success.",
      fullContent: `<p class="mb-4">School sanitation is a cornerstone of public health. A clean, safe school environment not only prevents the spread of diseases but also encourages higher enrollment, especially for girls. Our recent project involved constructing new latrine blocks at five primary schools in our operational wards.</p>
        <p class="mb-4">While the construction was the most visible part of the project, the true success came from what happened next. We engaged school management committees and parent associations from the very beginning. They were involved in site selection, material sourcing, and even provided labor. This approach fostered a deep sense of ownership.</p>
        <p class="mb-4">The most significant lesson we learned is that a beautiful latrine block is useless without a plan for its maintenance. By making the community responsible for the upkeep, they became more invested in its longevity. The schools now have established cleaning routines, and students are proud to be part of a healthy and hygienic learning environment. This model of community ownership is one we are committed to replicating across all our future projects.</p>`,
      author: "Mary Nasieku",
      date: "2025-01-10",
      readTime: "6 min read",
      image:
        "https://images.pexels.com/photos/8363018/pexels-photo-8363018.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Infrastructure",
    },
    {
      id: 4,
      title: "Early Detection Saves Lives: Our NCDs Screening Program Impact",
      excerpt:
        "Data from our latest screening camps shows the critical importance of community-based health interventions.",
      fullContent: `<p class="mb-4">In a span of three months, our mobile health units conducted NCDs screening camps in three different communities, reaching over 2,000 residents. Our goal was simple: to identify individuals at risk of non-communicable diseases and connect them with care before their conditions became life-threatening.</p>
        <p class="mb-4">The data we collected was sobering. Over 15% of the individuals screened had elevated blood sugar levels, and 25% were found to have dangerously high blood pressure. Many of these individuals were unaware of their condition. We provided on-site counseling, basic medication, and, most importantly, a clear path to follow-up care at a nearby clinic.</p>
        <p class="mb-4">This initiative highlights the immense value of proactive, community-based health interventions. By bringing screening services directly to the people, we are not only detecting diseases early but also empowering individuals to take control of their health. The stories of those who were able to start treatment and prevent a major health crisis are a powerful reminder of our mission.</p>`,
      author: "Dr. Peter Lemayian",
      date: "2025-01-08",
      readTime: "4 min read",
      image:
        "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Health Data",
    },
    {
      id: 5,
      title: "Empowering Communities Through Health Education",
      excerpt:
        "How our door-to-door education programs are creating lasting behavioral changes in hygiene practices.",
      fullContent: `<p class="mb-4">Health education is the foundation of long-term wellness. Our door-to-door education program is a unique initiative where trained educators visit families to discuss crucial health topics in a comfortable, personal setting. We cover everything from the importance of safe drinking water to recognizing symptoms of common illnesses and seeking timely medical attention.</p>
        <p class="mb-4">The program's success lies in its personal touch. Our educators build trust and rapport with families, making them more receptive to new ideas. We use visual aids and simple language to convey complex information, ensuring that everyone, regardless of their literacy level, can understand and apply the lessons.</p>
        <p class="mb-4">A recent follow-up study showed that households who participated in the program demonstrated a significant improvement in hygiene practices, including consistent handwashing and proper food storage. These small, daily changes accumulate into major health benefits for the entire community, proving that education is indeed the most powerful tool for empowerment.</p>`,
      author: "Grace Sankale",
      date: "2025-01-05",
      readTime: "5 min read",
      image:
        "https://images.pexels.com/photos/7551726/pexels-photo-7551726.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Community Engagement",
    },
    {
      id: 6,
      title: "Partnership Impact: Working with Local Government",
      excerpt:
        "How collaboration with county health services has amplified our reach and impact in both operational wards.",
      fullContent: `<p class="mb-4">Our mission is to create sustainable health solutions, and we recognize that we cannot achieve this alone. A key component of our strategy is to build strong, collaborative partnerships with local government and public health bodies. This past year, we formalized a partnership with the County Health Services department to combine our resources and expertise.</p>
        <p class="mb-4">This collaboration has allowed us to extend our reach into new areas and increase the scale of our existing programs. For instance, our joint health camps are now able to serve a larger population, and the data we collect is shared directly with the government, helping them to better allocate resources. The government provides us with essential supplies and access to their network of health workers, while we offer our expertise in community mobilization and on-the-ground implementation.</p>
        <p class="mb-4">Working together has not only maximized our impact but also built a model of efficiency and cooperation. It's a testament to what can be achieved when non-profits and government bodies unite for a common purpose: improving the health and well-being of the community.</p>`,
      author: "John Kiprotich",
      date: "2025-01-03",
      readTime: "8 min read",
      image:
        "https://images.pexels.com/photos/6995104/pexels-photo-6995104.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Partnerships",
    },
  ];

  const resourceCategories = [
    { label: "All Resources", value: "all", color: "text-gray-600" },
    { label: "WASH", value: "WASH", color: "text-blue-600" },
    { label: "NCDs", value: "NCDs", color: "text-red-600" },
    { label: "Training", value: "Training", color: "text-purple-600" },
  ];

  const blogCategories = [
    { label: "All", value: "all" },
    { label: "Success Stories", value: "Success Stories" },
    { label: "Health Education", value: "Health Education" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "Partnerships", value: "Partnerships" },
    { label: "Health Data", value: "Health Data" },
    { label: "Community Engagement", value: "Community Engagement" },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeResourceFilter === "all" ||
      resource.category === activeResourceFilter;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeBlogFilter === "all" || post.category === activeBlogFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredBlogPosts.find((post) => post.isFeatured);
  const otherBlogPosts = filteredBlogPosts.filter((post) => !post.isFeatured);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/159751/book-reading-reading-a-book-girl-159751.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Resources"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Resources & Insights
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
            Access our library of resources, research findings, and community
            stories to support health initiatives.
          </p>
        </div>
      </section>

      ---

      {/* Dynamic Search and Filter Bar */}
      <section className="py-12 bg-white sticky top-16 lg:top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Conditional rendering based on scroll position */}
          {!isBlogFilterVisible ? (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              {/* Filter Tabs for Resources */}
              <div className="flex flex-wrap gap-2">
                {resourceCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setActiveResourceFilter(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeResourceFilter === category.value
                        ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Filter className="w-4 h-4 inline-block mr-2" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              {/* Filter Tabs for Blog */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {blogCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setActiveBlogFilter(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeBlogFilter === category.value
                        ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      ---

      {/* Downloadable Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Downloadable Materials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our library of guides, protocols, and educational materials
              to support your health initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2">
                      {resource.icon}
                      <span className="text-sm font-medium">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        resource.category === "WASH"
                          ? "bg-blue-100 text-blue-700"
                          : resource.category === "NCDs"
                          ? "bg-red-100 text-red-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      <Tag className="w-3 h-3 inline-block mr-1" />
                      {resource.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(resource.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-end text-xs text-gray-500 mb-4">
                    <span>{resource.fileSize}</span>
                  </div>

                  <a
                    href={resource.downloadUrl}
                    download
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Download Resource</span>
                    <span className="sm:hidden">Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      ---

      {/* Blog Section */}
      <section ref={blogSectionRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Insights & Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read about our work, impact stories, and insights from the field
              of community health.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured Post */}
            {featuredPost && (
              <div className="lg:col-span-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 lg:p-12 text-white">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-4">
                      <span className="text-sm font-medium">Featured Story</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 hover:text-teal-100 transition-colors cursor-pointer">
                      {featuredPost.title}
                    </h3>
                    {!expandedPosts.has(featuredPost.id) ? (
                      <p className="text-teal-100 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                    ) : (
                      <div className="text-teal-100 mb-6 leading-relaxed max-h-96 overflow-y-auto">
                        <div dangerouslySetInnerHTML={{ __html: featuredPost.fullContent }} />
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => togglePostExpansion(featuredPost.id)}
                      className="mt-6 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-all duration-200"
                    >
                      {expandedPosts.has(featuredPost.id) ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Posts */}
            {otherBlogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors cursor-pointer line-clamp-2">
                    {post.title}
                  </h3>

                  {!expandedPosts.has(post.id) ? (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  ) : (
                    <div className="text-gray-600 text-sm mb-4 leading-relaxed max-h-96 overflow-y-auto">
                      <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePostExpansion(post.id)}
                    className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
                  >
                    {expandedPosts.has(post.id) ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredBlogPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      ---

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest resources,
            research findings, and community impact stories.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600"
            />
            <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;