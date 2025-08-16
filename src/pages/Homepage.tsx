import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Droplets, TreePine, Activity, Shield, HeartHandshake, ChevronRight, Calendar } from 'lucide-react';

const Homepage = () => {
  const [counters, setCounters] = useState({
    people: 0,
    waterPoints: 0,
    trees: 0,
    screenings: 0
  });

  useEffect(() => {
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 20);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(5000, (value) => setCounters(prev => ({ ...prev, people: value })));
            animateCounter(25, (value) => setCounters(prev => ({ ...prev, waterPoints: value })));
            animateCounter(1200, (value) => setCounters(prev => ({ ...prev, trees: value })));
            animateCounter(3000, (value) => setCounters(prev => ({ ...prev, screenings: value })));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const focusAreas = [
    {
      icon: <Droplets className="w-8 h-8 text-blue-600" />,
      title: 'WASH',
      subtitle: 'Water, Sanitation & Hygiene',
      description: 'Promoting access to clean water, proper sanitation, and hygiene education to prevent waterborne diseases.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Activity className="w-8 h-8 text-red-500" />,
      title: 'NCDs',
      subtitle: 'Non-Communicable Diseases',
      description: 'Prevention, early detection, and management of diabetes, hypertension, and cancer through community health initiatives.',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const testimonials = [
    {
      name: 'Mary Sankale',
      role: 'Community Member',
      quote: 'Through Biotisho\'s health education, my family now has access to clean water and we understand the importance of proper hygiene.',
      image: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Joseph Kiprotich',
      role: 'Local Leader',
      quote: 'The NCDs screening program helped detect my diabetes early. I am grateful for the referral and continued support.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Grace Nasieku',
      role: 'School Teacher',
      quote: 'The sanitation improvements in our school have reduced student absenteeism and created a healthier learning environment.',
      image: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const getInvolvedOptions = [
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: 'Volunteer',
      description: 'Join our community health promoters and make a direct impact in improving lives.',
      cta: 'Join Us'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-orange-500" />,
      title: 'Donate',
      description: 'Support our WASH and NCDs programs with your generous contribution.',
      cta: 'Donate Now'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Partner',
      description: 'Collaborate with us to amplify our impact and reach more communities.',
      cta: 'Partner With Us'
    }
  ];

  const news = [
    {
      title: 'New Water Point Completed in Kalesirua Village',
      summary: 'Community members now have access to clean water within walking distance, reducing waterborne diseases by 40%.',
      date: '2025-01-15',
      image: 'https://images.pexels.com/photos/1117209/pexels-photo-1117209.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Successful Diabetes Screening Campaign',
      summary: 'Over 200 community members screened for diabetes, with 15 cases detected early and referred for treatment.',
      date: '2025-01-10',
      image: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Tree Planting Initiative Launches',
      summary: 'Environmental conservation program begins with goal to plant 2,000 trees across both operational wards.',
      date: '2025-01-05',
      image: 'https://images.pexels.com/photos/1445416/pexels-photo-1445416.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/6994820/pexels-photo-6994820.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Community health work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Biotisho Kilimanjaro
            <span className="block text-teal-400">Good Healthy Life</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering communities in Kajiado County through WASH and NCDs prevention, 
            one household at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/get-involved"
              className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Get Involved <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="stats-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{counters.people.toLocaleString()}+</div>
              <div className="text-gray-600 font-medium">People Reached</div>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{counters.waterPoints}+</div>
              <div className="text-gray-600 font-medium">Water Points</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{counters.trees.toLocaleString()}+</div>
              <div className="text-gray-600 font-medium">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{counters.screenings.toLocaleString()}+</div>
              <div className="text-gray-600 font-medium">NCDs Screenings</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Building Healthier Communities Through Local Action
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Biotisho Kilimanjaro CBO was founded by trained community health promoters who identified critical gaps in healthcare delivery. We bridge the gap between communities and formal health facilities, focusing on prevention and early intervention.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Operating in Imbirikani/Eselenkei and Entonet/Lenkisim wards, we're committed to creating sustainable health solutions that empower communities to take ownership of their well-being.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors"
              >
                Read Our Full Story <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7551659/pexels-photo-7551659.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Community health workers"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-teal-600">2018</div>
                <div className="text-gray-600">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Focus Areas</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We concentrate our efforts on two critical areas that have the greatest impact on community health outcomes.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-white p-3 rounded-xl shadow-md mr-4">
                      {area.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{area.title}</h3>
                      <p className="text-gray-600">{area.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">{area.description}</p>
                  <Link 
                    to="/our-work"
                    className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                  >
                    Learn More <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Community Voices</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from community members whose lives have been positively impacted by our programs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              There are many ways to support our work and help us create healthier communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal-50 transition-colors">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                <Link 
                  to="/get-involved"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
                >
                  {option.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about our recent activities and impact in the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{article.summary}</p>
                  <Link 
                    to="/resources"
                    className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors"
                  >
                    Read More <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;