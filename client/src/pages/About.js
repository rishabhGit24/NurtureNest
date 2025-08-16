import React from 'react';
import { Heart, Users, Globe, Shield, Award, Target } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Direct Connection',
      description: 'Connect directly with orphanages and NGOs without intermediaries'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Make a real difference in children\'s lives through targeted donations'
    },
    {
      icon: Globe,
      title: 'Geographic Reach',
      description: 'Find and support orphanages in your local area and beyond'
    },
    {
      icon: Shield,
      title: 'Verified Organizations',
      description: 'All orphanages are verified and vetted for authenticity'
    },
    {
      icon: Award,
      title: 'Transparency',
      description: 'Track your donations and see their impact in real-time'
    },
    {
      icon: Target,
      title: 'Focused Giving',
      description: 'Donate specific items that orphanages actually need'
    }
  ];

  const team = [
    {
      name: 'Rishabh Bharadwaj R.',
      role: 'Founder & Developer',
      description: 'Lead developer and visionary behind NurtureNest'
    },
    {
      name: 'Shashank',
      role: 'Co-Founder & Developer',
      description: 'Technical architect and development partner'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Project Inception',
      description: 'NurtureNest concept developed and development began'
    },
    {
      year: '2024',
      title: 'MVP Development',
      description: 'Core features implemented and testing phase'
    },
    {
      year: '2025',
      title: 'Launch Target',
      description: 'Full production launch and startup scaling'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Heart className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          About NurtureNest
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
          A revolutionary donation platform that bridges the gap between generous donors and orphanages in need, 
          creating a more efficient and transparent way to help children.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Our Mission</h2>
          <p className="text-secondary-700 leading-relaxed">
            To create a seamless, transparent, and efficient donation ecosystem that connects donors directly 
            with orphanages and NGOs, ensuring that every contribution reaches those who need it most. We believe 
            in the power of community and technology to make a real difference in children's lives.
          </p>
        </div>
        
        <div className="card">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Our Vision</h2>
          <p className="text-secondary-700 leading-relaxed">
            To become the leading global platform for charitable donations, revolutionizing how people give 
            and how organizations receive support. We envision a world where no child goes without basic 
            necessities and where giving is simple, transparent, and impactful.
          </p>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="space-y-8">
        <div className="card bg-error-50 border-error-200">
          <h2 className="text-2xl font-bold text-error-800 mb-4">The Problem</h2>
          <p className="text-error-700 leading-relaxed">
            Current donation systems are scattered and inefficient. People willing to donate often don't know 
            which orphanages need help, and orphanages don't have a seamless way to manage or receive donations. 
            This leads to missed opportunities, inefficient resource allocation, and a lack of transparency 
            in the donation process.
          </p>
        </div>

        <div className="card bg-success-50 border-success-200">
          <h2 className="text-2xl font-bold text-success-800 mb-4">Our Solution</h2>
          <p className="text-success-700 leading-relaxed">
            NurtureNest centralizes the donation process, bridging the gap between donors and orphanages. 
            We provide real-time visibility of orphanages, categorized donation flows, and instant booking 
            notifications. Our platform ensures transparency, efficiency, and maximum impact for every donation.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Development Timeline */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">Development Timeline</h2>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600">{milestone.year}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-900 mb-1">{milestone.title}</h3>
                <p className="text-secondary-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <div key={index} className="card text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">{member.name}</h3>
              <p className="text-primary-600 font-medium mb-2">{member.role}</p>
              <p className="text-secondary-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div>
        <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Frontend', tech: 'React.js', color: 'bg-blue-100 text-blue-800' },
            { name: 'Backend', tech: 'Node.js + Express', color: 'bg-green-100 text-green-800' },
            { name: 'Database', tech: 'MongoDB', color: 'bg-yellow-100 text-yellow-800' },
            { name: 'Maps', tech: 'Mapbox GL JS', color: 'bg-purple-100 text-purple-800' }
          ].map((tech, index) => (
            <div key={index} className="card text-center">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">{tech.name}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tech.color}`}>
                {tech.tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card bg-primary-50 border-primary-200 text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Join Us in Making a Difference</h2>
        <p className="text-primary-700 mb-6 max-w-2xl mx-auto">
          Whether you're a donor looking to make an impact, an orphanage seeking support, or someone who 
          believes in our mission, we invite you to be part of the NurtureNest community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            Start Donating
          </button>
          <button className="btn-outline border-primary-600 text-primary-600 hover:bg-primary-50">
            Learn More
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-secondary-200">
        <p className="text-secondary-500">
          © 2023 NURTURENEST. Built with ❤️ for a better world.
        </p>
      </div>
    </div>
  );
};

export default About;
