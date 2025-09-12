// Beautiful response page template with NurtureNest theme
const generateResponsePage = (status, booking, donor, donorWhatsAppUrl) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'accepted':
        return {
          title: 'Donation Accepted!',
          subtitle: 'Great news! The donation has been accepted.',
          bgGradient: 'from-green-50 to-emerald-50',
          buttonGradient: 'from-green-500 to-emerald-600',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500',
          emoji: '🎉',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'rejected':
        return {
          title: 'Donation Declined',
          subtitle: 'The donation was not accepted at this time.',
          bgGradient: 'from-red-50 to-rose-50',
          buttonGradient: 'from-red-500 to-rose-600',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500',
          emoji: '😔',
          icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      case 'already_responded':
        return {
          title: 'Already Responded',
          subtitle: 'This booking has already been processed.',
          bgGradient: 'from-yellow-50 to-amber-50',
          buttonGradient: 'from-yellow-500 to-amber-600',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          emoji: '⏰',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        };
      default:
        return {
          title: 'Response Recorded',
          subtitle: 'Your response has been processed.',
          bgGradient: 'from-[#C5E3EA] to-[#ADE2ED]',
          buttonGradient: 'from-[#53AEC6] to-[#007290]',
          borderColor: 'border-[#53AEC6]',
          iconColor: 'text-[#53AEC6]',
          emoji: '✅',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const config = getStatusConfig();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Response - NurtureNest</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; }
        .hero-icon { width: 48px; height: 48px; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        .fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      </style>
    </head>
    <body class="bg-gradient-to-br ${config.bgGradient}">
      
      <!-- Header -->
      <header class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-2xl font-bold bg-gradient-to-r from-[#53AEC6] to-[#007290] bg-clip-text text-transparent">
                  NurtureNest
                </h1>
              </div>
            </div>
            <nav class="hidden md:flex space-x-8">
              <a href="/home" class="text-gray-700 hover:text-[#53AEC6] transition-colors duration-200">Home</a>
              <a href="/locations" class="text-gray-700 hover:text-[#53AEC6] transition-colors duration-200">Locations</a>
              <a href="/about-us" class="text-gray-700 hover:text-[#53AEC6] transition-colors duration-200">About Us</a>
              <a href="/feedback" class="text-gray-700 hover:text-[#53AEC6] transition-colors duration-200">Feedback</a>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="min-h-screen pt-8 pb-16 px-4">
        <div class="max-w-4xl mx-auto">
          
          <!-- Response Card -->
          <div class="bg-white rounded-3xl shadow-2xl border-2 ${config.borderColor} overflow-hidden fade-in">
            
            <!-- Header Section -->
            <div class="bg-gradient-to-r ${config.buttonGradient} px-8 py-8">
              <div class="flex items-center justify-center text-white">
                <div class="bg-white rounded-full p-4 mr-4 shadow-lg">
                  <svg class="hero-icon ${config.iconColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="${config.icon}"></path>
                  </svg>
                </div>
                <div class="text-center">
                  <h1 class="text-4xl font-bold mb-2">
                    ${config.emoji} ${config.title}
                  </h1>
                  <p class="text-xl opacity-90">
                    ${config.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <!-- Content Section -->
            <div class="p-8">
              
              <!-- Quick Stats -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 fade-in">
                <div class="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <svg class="w-10 h-10 text-[#007290] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                  <h3 class="font-bold text-[#007290] text-lg">Category</h3>
                  <p class="text-gray-700 capitalize font-medium">${booking.category}</p>
                </div>
                
                <div class="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <svg class="w-10 h-10 text-[#007290] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${config.icon}"></path>
                  </svg>
                  <h3 class="font-bold text-[#007290] text-lg">Status</h3>
                  <p class="font-bold capitalize text-lg ${status === 'accepted' ? 'text-green-600' : 'text-red-600'}">
                    ${status}
                  </p>
                </div>
                
                <div class="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-200">
                  <svg class="w-10 h-10 text-[#007290] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 0v10M8 11h8"></path>
                  </svg>
                  <h3 class="font-bold text-[#007290] text-lg">Date</h3>
                  <p class="text-gray-700 font-medium">${new Date(booking.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              <!-- Donor Information -->
              <div class="bg-gray-50 rounded-2xl p-8 mb-8 fade-in shadow-inner">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg class="w-8 h-8 text-[#53AEC6] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  👤 Donor Information
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-white rounded-xl p-4 border border-gray-200">
                    <p class="text-sm text-gray-600 mb-2 font-medium">Full Name</p>
                    <p class="font-bold text-gray-800 text-lg">${donor.firstName} ${donor.lastName}</p>
                  </div>
                  <div class="bg-white rounded-xl p-4 border border-gray-200">
                    <p class="text-sm text-gray-600 mb-2 font-medium">Phone Number</p>
                    <p class="font-bold text-gray-800 text-lg flex items-center">
                      <svg class="w-5 h-5 text-[#53AEC6] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      ${donor.phoneNumber}
                    </p>
                  </div>
                  <div class="md:col-span-2 bg-white rounded-xl p-4 border border-gray-200">
                    <p class="text-sm text-gray-600 mb-2 font-medium">Email Address</p>
                    <p class="font-bold text-gray-800 text-lg flex items-center">
                      <svg class="w-5 h-5 text-[#53AEC6] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      ${donor.email}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Donation Items -->
              <div class="bg-gray-50 rounded-2xl p-8 mb-8 fade-in shadow-inner">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg class="w-8 h-8 text-[#53AEC6] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                  🎁 Donation Items
                </h3>
                <div class="space-y-4">
                  ${booking.items.map((item, index) => `
                    <div class="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div class="flex items-center">
                        <div class="w-4 h-4 bg-gradient-to-r from-[#53AEC6] to-[#007290] rounded-full mr-4"></div>
                        <span class="font-bold text-gray-800 text-lg">${item.name}</span>
                      </div>
                      <span class="text-[#007290] font-black text-xl bg-[#C5E3EA] px-4 py-2 rounded-full">
                        ${item.quantity} ${item.unit}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>

              ${booking.specialInstructions ? `
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-8 fade-in">
                  <h3 class="text-xl font-bold text-blue-900 mb-4 flex items-center">
                    <svg class="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    💬 Special Instructions
                  </h3>
                  <p class="text-blue-800 text-lg font-medium leading-relaxed">${booking.specialInstructions}</p>
                </div>
              ` : ''}

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-6 justify-center mb-8 fade-in">
                ${donorWhatsAppUrl && status !== 'already_responded' ? `
                  <a href="${donorWhatsAppUrl}" target="_blank" 
                     class="group flex items-center justify-center gap-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                    <svg class="w-8 h-8 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.148"/>
                    </svg>
                    <span class="text-xl">📱 Notify Donor via WhatsApp</span>
                  </a>
                ` : ''}
                
                <a href="/home" 
                   class="group flex items-center justify-center gap-4 bg-gradient-to-r ${config.buttonGradient} text-white font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <svg class="w-8 h-8 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span class="text-xl">🏠 Back to Home</span>
                </a>
                
                ${status === 'already_responded' ? `
                  <a href="/orphanage-login" 
                     class="group flex items-center justify-center gap-4 bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                    <svg class="w-8 h-8 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-5h6m-9 9H3m2 0h2M9 7h6m-6 4h6m-6 4h6"></path>
                    </svg>
                    <span class="text-xl">📋 View Dashboard</span>
                  </a>
                ` : ''}
              </div>

              <!-- Next Steps -->
              <div class="p-8 rounded-2xl border-2 ${config.borderColor} ${config.bgGradient} fade-in shadow-inner">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <svg class="w-8 h-8 text-[#007290] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                  📋 What's Next?
                </h3>
                <div class="space-y-4 text-gray-700 text-lg leading-relaxed">
                  ${status === 'accepted' ? `
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">✅</span>
                      <p><strong class="text-green-700">Donation Accepted!</strong> The donor will contact you to arrange delivery.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">📞</span>
                      <p><strong class="text-blue-700">Stay Available:</strong> Be ready to coordinate pickup/delivery details.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">💬</span>
                      <p><strong class="text-green-700">Use WhatsApp:</strong> Click the "Notify Donor" button to send them an update.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">🤝</span>
                      <p><strong class="text-purple-700">Thank You:</strong> for supporting our mission to help children in need!</p>
                    </div>
                  ` : status === 'rejected' ? `
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">📝</span>
                      <p><strong class="text-blue-700">Response Recorded:</strong> The donor has been notified of your decision.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">🙏</span>
                      <p><strong class="text-purple-700">Thank You:</strong> for considering this donation request.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">💡</span>
                      <p><strong class="text-green-700">Future Donations:</strong> You can always accept future requests that better fit your needs.</p>
                    </div>
                  ` : status === 'already_responded' ? `
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">⏰</span>
                      <p><strong class="text-yellow-700">Already Processed:</strong> This booking has already been ${booking.status}.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">📅</span>
                      <p><strong class="text-blue-700">Response Date:</strong> ${booking.orphanageResponse?.respondedAt ? new Date(booking.orphanageResponse.respondedAt).toLocaleDateString('en-IN') : 'Not available'}</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">💭</span>
                      <p><strong class="text-purple-700">Note:</strong> You cannot change your response once it's been submitted.</p>
                    </div>
                  ` : `
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">📋</span>
                      <p><strong class="text-blue-700">Response Processed:</strong> Your response has been recorded in our system.</p>
                    </div>
                    <div class="flex items-start space-x-3">
                      <span class="text-2xl">💬</span>
                      <p><strong class="text-green-700">Communication:</strong> Use the notification features to stay in touch with donors.</p>
                    </div>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Info -->
          <div class="mt-12 bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center fade-in">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <span class="text-3xl mr-3">🌟</span>
              Making a Difference Together
            </h3>
            <p class="text-gray-600 text-lg mb-6 leading-relaxed">
              Every donation response helps us connect generous hearts with children in need. 
              Thank you for being part of the NurtureNest community!
            </p>
            <div class="flex justify-center space-x-8 text-gray-500">
              <div class="text-center">
                <span class="text-2xl block mb-2">💝</span>
                <span class="font-medium">Donations Facilitated</span>
              </div>
              <div class="text-center">
                <span class="text-2xl block mb-2">🏠</span>
                <span class="font-medium">Orphanages Connected</span>
              </div>
              <div class="text-center">
                <span class="text-2xl block mb-2">🤝</span>
                <span class="font-medium">Lives Touched</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-gradient-to-r from-[#007290] to-[#53AEC6] text-white py-12 mt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <h3 class="text-3xl font-bold mb-4">NurtureNest</h3>
          <p class="text-[#C5E3EA] text-lg mb-6">Connecting hearts, nurturing futures</p>
          <div class="flex justify-center space-x-8 text-sm opacity-90">
            <span>Made with ❤️ for children in need</span>
          </div>
          <div class="mt-6 pt-6 border-t border-[#C5E3EA] opacity-75">
            <p class="text-sm">© 2024 NurtureNest. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </body>
    </html>
  `;
};

module.exports = { generateResponsePage };
