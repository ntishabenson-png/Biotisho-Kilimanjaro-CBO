import React, { useState } from 'react';
import { Users, Heart, Handshake, ArrowRight, CheckCircle, DollarSign, Clock, Award } from 'lucide-react';

const GetInvolved = () => {
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
    availability: '',
    experience: ''
  });

  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    organizationType: '',
    partnershipType: '',
    message: ''
  });

  const volunteerOpportunities = [
    {
      title: "Community Health Educator",
      description: "Conduct health education sessions on WASH and NCDs prevention in community settings.",
      timeCommitment: "4-6 hours/week",
      requirements: ["Basic health knowledge", "Good communication skills", "Community engagement experience"],
      impact: "Reach 50+ community members weekly"
    },
    {
      title: "Data Collection Assistant",
      description: "Help collect and manage data from our various programs and screening activities.",
      timeCommitment: "2-4 hours/week",
      requirements: ["Basic computer skills", "Attention to detail", "Ability to work with numbers"],
      impact: "Support evidence-based program improvements"
    },
    {
      title: "Water Point Maintenance Volunteer",
      description: "Assist in routine maintenance and monitoring of community water points.",
      timeCommitment: "6-8 hours/month",
      requirements: ["Technical aptitude", "Physical fitness", "Problem-solving skills"],
      impact: "Ensure 2000+ people have consistent water access"
    },
    {
      title: "Event Organizer",
      description: "Help organize and coordinate health screening camps and community events.",
      timeCommitment: "Flexible",
      requirements: ["Organizational skills", "Local connections", "Event planning experience"],
      impact: "Enable large-scale community health interventions"
    }
  ];

  const donationImpacts = [
    {
      amount: "$25",
      impact: "Provides hygiene kits for 5 families",
      icon: <Heart className="w-8 h-8 text-red-500" />
    },
    {
      amount: "$50",
      impact: "Supports diabetes screening for 25 people",
      icon: <Users className="w-8 h-8 text-blue-500" />
    },
    {
      amount: "$100",
      impact: "Funds water quality testing for 1 month",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />
    },
    {
      amount: "$250",
      impact: "Sponsors a community health education session",
      icon: <Award className="w-8 h-8 text-purple-500" />
    }
  ];

  const partnershipTypes = [
    {
      type: "Implementation Partner",
      description: "Organizations that work directly with us to implement programs in communities.",
      examples: ["Local NGOs", "Community Groups", "Faith-based Organizations"]
    },
    {
      type: "Funding Partner",
      description: "Institutions that provide financial support for our programs and operations.",
      examples: ["Foundations", "Government Agencies", "International Organizations"]
    },
    {
      type: "Technical Partner",
      description: "Organizations providing expertise, training, or technical assistance.",
      examples: ["Universities", "Research Institutions", "Professional Associations"]
    },
    {
      type: "Corporate Partner",
      description: "Private companies supporting through CSR initiatives or in-kind donations.",
      examples: ["Healthcare Companies", "Water Companies", "Technology Firms"]
    }
  ];

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle volunteer form submission
    console.log('Volunteer form submitted:', volunteerForm);
    alert('Thank you for your interest! We will contact you soon.');
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle partner form submission
    console.log('Partner form submitted:', partnerForm);
    alert('Thank you for your interest in partnering with us! We will be in touch.');
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/6994993/pexels-photo-6994993.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Get involved"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Get Involved</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Join our mission to create healthier communities. There are many ways to support our work and make a lasting impact.
          </p>
        </div>
      </section>

      {/* Three Main Ways to Get Involved */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Volunteer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Use your skills and passion to directly impact community health outcomes through our various volunteer programs.
              </p>
              <a href="#volunteer" className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                Join as Volunteer <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Donate</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Support our WASH and NCDs programs with financial contributions that directly fund community health initiatives.
              </p>
              <a href="#donate" className="inline-flex items-center text-red-500 font-semibold hover:text-red-600 transition-colors">
                Make a Donation <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partner</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Collaborate with us as an organization to amplify our impact and reach more communities with our programs.
              </p>
              <a href="#partner" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                Become a Partner <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Make a direct impact in community health by joining our team of dedicated volunteers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{opportunity.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{opportunity.description}</p>
                
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Commitment: {opportunity.timeCommitment}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {opportunity.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-teal-800 font-medium text-sm">Impact: {opportunity.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Volunteer Application</h3>
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="volunteer-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="volunteer-name"
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="volunteer-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="volunteer-email"
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="volunteer-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="volunteer-phone"
                    value={volunteerForm.phone}
                    onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="volunteer-availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    id="volunteer-availability"
                    value={volunteerForm.availability}
                    onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  >
                    <option value="">Select availability</option>
                    <option value="weekends">Weekends only</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="flexible">Flexible</option>
                    <option value="evenings">Evenings</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="volunteer-interests" className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Interest *
                </label>
                <select
                  id="volunteer-interests"
                  value={volunteerForm.interests}
                  onChange={(e) => setVolunteerForm({...volunteerForm, interests: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  required
                >
                  <option value="">Select your interest</option>
                  <option value="health-education">Community Health Education</option>
                  <option value="data-collection">Data Collection</option>
                  <option value="water-maintenance">Water Point Maintenance</option>
                  <option value="event-organization">Event Organization</option>
                  <option value="multiple">Multiple Areas</option>
                </select>
              </div>

              <div>
                <label htmlFor="volunteer-experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="volunteer-experience"
                  value={volunteerForm.experience}
                  onChange={(e) => setVolunteerForm({...volunteerForm, experience: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  placeholder="Tell us about any relevant experience you have..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center"
                >
                  Submit Application <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your donation directly supports community health programs and creates lasting positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {donationImpacts.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{item.amount}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.impact}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose your donation amount or enter a custom amount. Every contribution helps us reach more communities with vital health services.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['$25', '$50', '$100', '$250', '$500'].map((amount) => (
                <button
                  key={amount}
                  className="bg-white border-2 border-red-200 text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="max-w-sm mx-auto mb-8">
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
                Or enter custom amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  id="custom-amount"
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <button className="bg-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center">
              Donate Now <Heart className="ml-2 w-5 h-5" />
            </button>

            <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Secure Payment
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                100% Goes to Programs
              </span>
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Tax Deductible
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section id="partner" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Partner With Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our network of partners working together to create healthier, more resilient communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.type}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Partnership Inquiry</h3>
            <form onSubmit={handlePartnerSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    id="org-name"
                    value={partnerForm.organizationName}
                    onChange={(e) => setPartnerForm({...partnerForm, organizationName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-person" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contact-person"
                    value={partnerForm.contactPerson}
                    onChange={(e) => setPartnerForm({...partnerForm, contactPerson: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="partner-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="partner-email"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({...partnerForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="partner-phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="partner-phone"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({...partnerForm, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="org-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Type *
                  </label>
                  <select
                    id="org-type"
                    value={partnerForm.organizationType}
                    onChange={(e) => setPartnerForm({...partnerForm, organizationType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="ngo">NGO/Non-profit</option>
                    <option value="government">Government Agency</option>
                    <option value="corporate">Corporate/Private</option>
                    <option value="academic">Academic Institution</option>
                    <option value="foundation">Foundation</option>
                    <option value="international">International Organization</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="partnership-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Interest *
                  </label>
                  <select
                    id="partnership-type"
                    value={partnerForm.partnershipType}
                    onChange={(e) => setPartnerForm({...partnerForm, partnershipType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="implementation">Implementation Partner</option>
                    <option value="funding">Funding Partner</option>
                    <option value="technical">Technical Partner</option>
                    <option value="corporate">Corporate Partner</option>
                    <option value="multiple">Multiple Types</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="partner-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Partnership Proposal *
                </label>
                <textarea
                  id="partner-message"
                  value={partnerForm.message}
                  onChange={(e) => setPartnerForm({...partnerForm, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Describe how you'd like to partner with us, what resources you can offer, and what outcomes you hope to achieve..."
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center"
                >
                  Submit Partnership Inquiry <Handshake className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;