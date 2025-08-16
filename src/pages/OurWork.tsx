import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Activity, MapPin, Users, TrendingUp, CheckCircle } from 'lucide-react';

const OurWork = () => {
  const [activeTab, setActiveTab] = useState('WASH');

  const washProjects = [
    {
      title: "Kalesirua Village Water Point",
      summary: "Construction and maintenance of a community water point serving 500+ households",
      image: "https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "2,000+ people",
        waterPointsInstalled: "3 points",
        diseaseReduction: "40% reduction in waterborne diseases"
      },
      location: "Kalesirua Village",
      status: "Completed",
      description: "A comprehensive water access project that included drilling, pump installation, and community training on maintenance. The project has dramatically reduced the distance families need to travel for clean water."
    },
    {
      title: "School Sanitation Initiative",
      summary: "Improving sanitation infrastructure in 5 primary schools across both operational wards",
      image: "https://images.pexels.com/photos/8363018/pexels-photo-8363018.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "1,500 students",
        facilitiesBuilt: "20 sanitation facilities",
        attendanceImprovement: "25% increase in attendance"
      },
      location: "Imbirikani & Entonet Wards",
      status: "Ongoing",
      description: "Constructing modern, gender-separated sanitation facilities with handwashing stations and menstrual hygiene management facilities. Includes hygiene education programs for students and teachers."
    },
    {
      title: "Community Hygiene Education",
      summary: "Door-to-door hygiene education and behavior change campaigns",
      image: "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "3,000+ households",
        educationSessions: "150 sessions",
        behaviorChange: "60% improvement in practices"
      },
      location: "All Operational Areas",
      status: "Ongoing",
      description: "Comprehensive behavior change communication program focusing on proper handwashing, safe water storage, waste management, and food hygiene practices. Conducted by trained community health promoters."
    },
    {
      title: "Waste Management Program",
      summary: "Community-based solid waste collection and management system",
      image: "https://images.pexels.com/photos/9324304/pexels-photo-9324304.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "1,000+ households",
        wasteCollected: "50 tons monthly",
        jobsCreated: "15 local jobs"
      },
      location: "Urban Centers",
      status: "Ongoing",
      description: "Establishing sustainable waste collection routes, composting sites, and recycling initiatives while creating income opportunities for community members."
    }
  ];

  const ncdsProjects = [
    {
      title: "Diabetes & Hypertension Screening",
      summary: "Regular community screening camps for early detection of NCDs",
      image: "https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "2,500+ people screened",
        casesDetected: "180 new cases",
        referralsMade: "150 successful referrals"
      },
      location: "All Operational Areas",
      status: "Ongoing",
      description: "Monthly screening camps using portable equipment to test blood pressure, blood sugar levels, and BMI. Includes immediate referral system to formal health facilities for confirmed cases."
    },
    {
      title: "Cancer Awareness Campaign",
      summary: "Education and early detection programs for common cancers",
      image: "https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "1,800+ people reached",
        screeningsArranged: "120 cervical screenings",
        earlyDetections: "8 early-stage cases"
      },
      location: "Community Health Centers",
      status: "Ongoing",
      description: "Comprehensive cancer education focusing on cervical, breast, and prostate cancers. Partners with county health services to provide screening services and follow-up care."
    },
    {
      title: "NCDs Support Groups",
      summary: "Peer support networks for people living with chronic conditions",
      image: "https://images.pexels.com/photos/7551726/pexels-photo-7551726.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "200+ group members",
        groupsFormed: "8 support groups",
        adherenceImprovement: "70% medication adherence"
      },
      location: "Both Operational Wards",
      status: "Ongoing",
      description: "Facilitating peer support groups for diabetes and hypertension patients, providing education on medication adherence, lifestyle changes, and emotional support."
    },
    {
      title: "Nutrition Education Program",
      summary: "Promoting healthy eating habits to prevent and manage NCDs",
      image: "https://images.pexels.com/photos/6995104/pexels-photo-6995104.jpeg?auto=compress&cs=tinysrgb&w=500",
      impact: {
        beneficiaries: "1,200+ participants",
        cookingDemos: "50 demonstrations",
        knowledgeImprovement: "80% knowledge increase"
      },
      location: "Community Centers",
      status: "Ongoing",
      description: "Interactive nutrition education sessions with practical cooking demonstrations using locally available foods. Focus on diabetes-friendly and heart-healthy meal preparation."
    }
  ];

  const successStories = [
    {
      name: "Margaret Sankale",
      story: "Thanks to the water point in our village, my children no longer miss school due to water-related illnesses. The 2-hour daily walk for water is now a 10-minute walk.",
      impact: "Improved health and education outcomes",
      image: "https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "John Kiprotich",
      story: "The diabetes screening camp detected my condition early. With proper medication and support group participation, I'm managing my health well and living normally.",
      impact: "Early detection saved his life",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Rose Nasieku",
      story: "As a teacher, I've seen dramatic improvements in student attendance and performance since the new sanitation facilities were built in our school.",
      impact: "Better learning environment",
      image: "https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const currentProjects = activeTab === 'WASH' ? washProjects : ncdsProjects;

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-teal-600 to-green-600">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/6995051/pexels-photo-6995051.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Our work"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Our Work</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Transforming communities through comprehensive WASH and NCDs programs that create lasting impact.
          </p>
        </div>
      </section>

      {/* Project Tabs */}
      <section className="py-12 bg-white sticky top-16 lg:top-20 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <button
                onClick={() => setActiveTab('WASH')}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'WASH'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Droplets className="w-5 h-5 inline-block mr-2" />
                WASH Programs
              </button>
              <button
                onClick={() => setActiveTab('NCDs')}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'NCDs'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <Activity className="w-5 h-5 inline-block mr-2" />
                NCDs Programs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                      project.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  {/* Impact Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.impact).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-bold ${
                          activeTab === 'WASH' ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {value}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Community Impact Project
                    </div>
                   <Link 
                     to="/contact"
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      activeTab === 'WASH'
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                   }`}
                   >
                      Learn More
                   </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Reach</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Operating across two wards in Loitokitok Sub County, reaching diverse communities with our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Imbirikani/Eselenkei Ward</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Population Reached</span>
                  <span className="font-semibold text-gray-900">2,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Points</span>
                  <span className="font-semibold text-gray-900">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Health Screenings</span>
                  <span className="font-semibold text-gray-900">1,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Schools Supported</span>
                  <span className="font-semibold text-gray-900">3</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Entonet/Lenkisim Ward</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Population Reached</span>
                  <span className="font-semibold text-gray-900">2,800+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Water Points</span>
                  <span className="font-semibold text-gray-900">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Health Screenings</span>
                  <span className="font-semibold text-gray-900">1,800</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Schools Supported</span>
                  <span className="font-semibold text-gray-900">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from community members whose lives have been transformed by our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-green-600 text-sm font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {story.impact}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{story.story}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg lg:text-xl text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join us in our mission to create healthier, more resilient communities through sustainable programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Link 
              to="/get-involved"
              className="bg-white text-teal-600 px-6 lg:px-8 py-3 lg:py-4 rounded-full text-base lg:text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWork;