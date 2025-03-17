import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Carousel, 
  Progress, 
  Dropdown, 
  Modal, 
  Badge
} from 'flowbite-react';
import { 
  FaCamera, 
  FaCalendarAlt, 
  FaCommentDots, 
  FaShieldAlt, 
  FaMapMarkedAlt,
  FaChartLine,
  FaLeaf,
  FaBell,
  FaLanguage
} from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';

console.log(GiIcons); // This will log all available icons in the console

import { HiOutlineDocumentReport } from 'react-icons/hi';
import { motion } from 'framer-motion';

// Placeholder images - replace with actual assets
const heroBackgroundImage = "https://via.placeholder.com/600x400";
const mapPlaceholder = "https://via.placeholder.com/600x400";
const farmer1 = "https://via.placeholder.com/100x100";
const farmer2 = "https://via.placeholder.com/100x100";
const farmer3 = "https://via.placeholder.com/100x100";
const beforeTreeImage = "https://via.placeholder.com/300x200";
const afterTreeImage = "https://via.placeholder.com/300x200";

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  
  // Translations
  const translations = {
    en: {
      headline: "Protect Your Coconut Crops â€“ Detect Diseases, Get Expert Help, Save Your Harvest!",
      scanButton: "Scan Coconut Disease Now",
      bookButton: "Book CT Officer Appointment",
      chatButton: "Ask Our Farming Chatbot",
      aiScanner: "AI Disease Scanner",
      aiScannerDesc: "Upload photos of your tree â€“ get instant disease diagnosis!",
      pandemicControl: "Pandemic Control",
      pandemicControlDesc: "Southern Province emergency? Book certified officers to inspect your land.",
      riskMap: "Live Risk Map",
      riskMapDesc: "Check disease spread in your area.",
      viewFullMap: "View Full Map & Reports",
      inspections: "Total Inspections This Month",
      detected: "Diseases Detected",
      certificates: "Certificates Issued",
      progress: "Southern Province Pandemic Control",
      inspected: "inspected",
      farmerStories: "Farmer Stories",
      updates: "Latest Updates",
      alert: "NEW DISEASE ALERT: Tap here to book urgent inspection!",
      chatbotTitle: "Ask Our Expert Chatbot",
      chatbotPrompt1: "How to spot red beetle damage?",
      chatbotPrompt2: "What to do if my tree is infected?",
      chatbotPrompt3: "Preventive measures for my farm?",
      emergencyTitle: "Emergency Disease Alert",
      bookNow: "Book Inspection Now",
      close: "Close"
    },
    si: {
      headline: "ඔබගේ පොල් බෝග ආරක්ෂා කරන්න - රෝග හඳුනාගන්න, විශේෂඥ උපකාර ලබාගන්න, ඔබේ අස්වැන්න සුරකින්න!",
    scanButton: "දැන් පොල් රෝග පරිලෝකනය කරන්න",
    bookButton: "CT නිලධාරි හමුවීමක් වෙන් කරන්න",
    chatButton: "අපගේ ගොවිතැන් චැට්බොට් අසන්න",
    aiScanner: "AI රෝග පරික්ෂකය",
    aiScannerDesc: "ඔබේ ගසේ ඡායාරූප උඩුගත කරන්න – ක්ෂණික රෝග විශ්ලේෂණය ලබා ගන්න!",
    pandemicControl: "සංක්‍රමණ පාලනය",
    pandemicControlDesc: "දක්ෂ නිලධාරීන් ඔබේ ඉඩම පරීක්ෂා කිරීමට වෙන්කරන්න.",
    riskMap: "සජීවී අවදානම් සිතියම",
    riskMapDesc: "ඔබේ ප්‍රදේශයේ රෝග පැතිරීම පරීක්ෂා කරන්න.",
    viewFullMap: "සම්පූර්ණ සිතියම සහ වාර්තා බලන්න",
    chatbotTitle: "අපගේ විශේෂඥ චැට්බොට් අසන්න",
    },
    ta: {
      headline: "உங்கள் தென்னை பயிர்களைப் பாதுகாக்கவும் - நோய்களைக் கண்டறியவும், நிபுணர் உதவியைப் பெறவும், உங்கள் அறுவடையைக் காப்பாற்றவும்!",
      scanButton: "இப்போது தென்னை நோயை ஸ்கேன் செய்யவும்",
      bookButton: "CT அதிகாரி சந்திப்பை முன்பதிவு செய்யவும்",
      chatButton: "எங்கள் விவசாய சாட்போட்டை கேளுங்கள்",
      aiScanner: "AI நோய் ஸ்கேனர்",
      aiScannerDesc: "உங்கள் மரத்தின் புகைப்படங்களை பதிவேற்றவும் – உடனடி நோய் பரிசோதனை பெறவும்!",
      pandemicControl: "தீவிர நோய் பராமரிப்பு",
      pandemicControlDesc: "உங்கள் நிலத்தை ஆய்வு செய்ய அதிகாரிகளை முன்பதிவு செய்யவும்.",
      riskMap: "நேரடி அபாய வரைபடம்",
      riskMapDesc: "உங்கள் பகுதியில் நோய்கள் எவ்வாறு பரவுகின்றன எனப் பார்க்கவும்.",
      viewFullMap: "முழு வரைபடத்தையும் அறிக்கைகளையும் பார்க்கவும்",
      chatbotTitle: "எங்கள் நிபுணர் சாட்போட்டை கேளுங்கள்",
    }
  };
  
  const t = translations[language] || translations.en;

  return (
    <div className="font-sans">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50">
        <Dropdown 
          label={<FaLanguage className="text-2xl" />}
          arrowIcon={false}
          inline
        >
          <Dropdown.Item onClick={() => setLanguage('en')}>English</Dropdown.Item>
          <Dropdown.Item onClick={() => setLanguage('si')}>සිංහල</Dropdown.Item>
          <Dropdown.Item onClick={() => setLanguage('ta')}>தமிழ்</Dropdown.Item>
        </Dropdown>
      </div>

      {/* Emergency Alert Banner */}
      <motion.div 
        className="bg-red-600 text-white p-4 text-center cursor-pointer"
        onClick={() => setShowEmergencyModal(true)}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex items-center justify-center gap-2">
          <FaBell className="text-xl" />
          <span className="font-medium">{t.alert}</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${heroBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 py-20">
          <div className="text-center text-white max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                {t.headline}
              </h1>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-6 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button 
                size="xl" 
                className="h-36 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-xl shadow-lg"
              >
                <FaCamera className="text-4xl mb-3" />
                <span className="text-lg font-medium">{t.scanButton}</span>
              </Button>
              
              <Button 
                size="xl" 
                className="h-36 flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 rounded-xl shadow-lg"
              >
                <FaCalendarAlt className="text-4xl mb-3" />
                <span className="text-lg font-medium">{t.bookButton}</span>
              </Button>
              
              <Button 
                size="xl" 
                className="h-36 flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-xl shadow-lg"
                onClick={() => setShowChatbot(true)}
              >
                <FaCommentDots className="text-4xl mb-3" />
                <span className="text-lg font-medium">{t.chatButton}</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L80,149.3C160,171,320,213,480,224C640,235,800,213,960,192C1120,171,1280,149,1360,138.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <FaCamera className="text-4xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.aiScanner}</h3>
                  <p className="text-gray-600">{t.aiScannerDesc}</p>
                  <img 
                    src="https://via.placeholder.com/300x200" 
                    alt="AI Scanner" 
                    className="w-full object-cover rounded-lg mt-4"
                  />
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-yellow-100 p-4 rounded-full mb-4">
                    <FaShieldAlt className="text-4xl text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.pandemicControl}</h3>
                  <p className="text-gray-600">{t.pandemicControlDesc}</p>
                  <div className="mt-4 w-full">
                    <Button color="warning" className="w-full mt-2">
                      <FaCalendarAlt className="mr-2" />
                      {t.bookButton}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4">
                    <FaMapMarkedAlt className="text-4xl text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t.riskMap}</h3>
                  <p className="text-gray-600">{t.riskMapDesc}</p>
                  <div className="relative w-full mt-4">
                    <img 
                      src={mapPlaceholder} 
                      alt="Risk map" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button color="dark" className="opacity-90">
                        <HiOutlineDocumentReport className="mr-2" />
                        {t.viewFullMap}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            <span className="border-b-4 border-green-500 pb-2">Dashboard</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 rounded-full mb-3">
                    <FaChartLine className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-600">1,250</h3>
                  <p className="text-gray-600">{t.inspections}</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
            <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
              <div className="p-6 flex flex-col items-center text-center">
               <div className="bg-red-100 p-3 rounded-full mb-3">
                <FaLeaf className="text-2xl text-red-600" />
               </div>
              <h3 className="text-3xl font-bold text-red-600">320</h3>
              <p className="text-gray-600">{t.detected}</p>
              </div>
            </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-yellow-100 p-3 rounded-full mb-3">
                    <FaShieldAlt className="text-2xl text-yellow-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-yellow-600">95</h3>
                  <p className="text-gray-600">{t.certificates}</p>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="p-6 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold mb-3">{t.progress}</h3>
                  <div className="mb-2 w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-blue-700">65%</span>
                      <span className="text-sm font-medium text-gray-500">{t.inspected}</span>
                    </div>
                    <Progress
                      progress={65}
                      color="green"
                      size="lg"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Risk Map */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="border-b-4 border-red-500 pb-2">Disease Risk Map</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitor disease spread in real-time across all provinces. Hover over regions to see detailed statistics.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-6 overflow-hidden">
            <div className="relative">
              <img 
                src={mapPlaceholder} 
                alt="Sri Lanka Risk Map" 
                className="w-full h-96 object-contain mx-auto"
              />
              {/* Sample Risk Indicators - These would be dynamic in a real app */}
              <div className="absolute" style={{ top: '30%', left: '40%' }}>
                <Badge color="red" className="px-3 py-2 cursor-pointer">
                  Matara: High Risk
                </Badge>
              </div>
              <div className="absolute" style={{ top: '60%', left: '60%' }}>
                <Badge color="yellow" className="px-3 py-2 cursor-pointer">
                  Galle: Medium Risk
                </Badge>
              </div>
              <div className="absolute" style={{ top: '45%', left: '70%' }}>
                <Badge color="green" className="px-3 py-2 cursor-pointer">
                  Hambantota: Low Risk
                </Badge>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button color="dark" size="lg">
                <HiOutlineDocumentReport className="mr-2" />
                {t.viewFullMap}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="border-b-4 border-green-500 pb-2">{t.farmerStories}</span>
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Carousel slide={false} indicators={true}>
              <div className="p-6 md:p-12 bg-gray-50 rounded-xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <img 
                      src={farmer1} 
                      alt="Farmer" 
                      className="rounded-full w-32 h-32 mx-auto border-4 border-green-500"
                    />
                    <p className="font-bold text-center mt-4">K. Perera, Matara</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <p className="text-lg italic">"This app saved my farm from the new disease! The AI detected early signs before I could see them, and the CT officer gave me treatment advice that worked perfectly."</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Before Treatment:</p>
                        <img src={beforeTreeImage} alt="Before" className="rounded-lg w-full" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">After Treatment:</p>
                        <img src={afterTreeImage} alt="After" className="rounded-lg w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-12 bg-gray-50 rounded-xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <img 
                      src={farmer2} 
                      alt="Farmer" 
                      className="rounded-full w-32 h-32 mx-auto border-4 border-green-500"
                    />
                    <p className="font-bold text-center mt-4">S. Fernando, Galle</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <p className="text-lg italic">"I was losing hope when my trees started showing strange symptoms. The chatbot helped identify the issue, and within days of following the recommended treatment, my trees started recovering!"</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Before Treatment:</p>
                        <img src={beforeTreeImage} alt="Before" className="rounded-lg w-full" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">After Treatment:</p>
                        <img src={afterTreeImage} alt="After" className="rounded-lg w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:p-12 bg-gray-50 rounded-xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <img 
                      src={farmer3} 
                      alt="Farmer" 
                      className="rounded-full w-32 h-32 mx-auto border-4 border-green-500"
                    />
                    <p className="font-bold text-center mt-4">A. Silva, Hambantota</p>
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <p className="text-lg italic">"Our entire village now uses this app! The risk map helped us create a community protection plan. Working together, we've reduced disease spread by over 80% in just three months."</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Before Treatment:</p>
                        <img src={beforeTreeImage} alt="Before" className="rounded-lg w-full" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">After Treatment:</p>
                        <img src={afterTreeImage} alt="After" className="rounded-lg w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* News/Updates Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="border-b-4 border-blue-500 pb-2">{t.updates}</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <Badge color="blue" className="mb-4">NEW</Badge>
                  <h4 className="text-xl font-bold mb-2">Latest Pandemic Guidelines</h4>
                  <p className="text-sm text-gray-500 mb-4">Updated: 2023-10-15</p>
                  <p className="text-gray-600 mb-4">New guidelines from the Coconut Development Board on managing the emerging palm weevil outbreak.</p>
                  <Button color="light" className="mt-auto w-full">
                    Read More
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <Badge color="green" className="mb-4">SUCCESS STORY</Badge>
                  <h4 className="text-xl font-bold mb-2">How Galle Farmers Stopped the Spread</h4>
                  <p className="text-sm text-gray-500 mb-4">Updated: 2023-10-10</p>
                  <p className="text-gray-600 mb-4">Learn how a community approach to disease management halted an outbreak in just two weeks.</p>
                  <Button color="light" className="mt-auto w-full">
                    Read More
                  </Button>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden h-full hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <Badge color="yellow" className="mb-4">SEASONAL</Badge>
                  <h4 className="text-xl font-bold mb-2">Monsoon Care Tips for Coconut Farmers</h4>
                  <p className="text-sm text-gray-500 mb-4">Updated: 2023-10-05</p>
                  <p className="text-gray-600 mb-4">Essential practices to protect your coconut trees during the upcoming monsoon season.</p>
                  <Button color="light" className="mt-auto w-full">
                    Read More
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chatbot Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          pill 
          color="blue" 
          className="w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl"
          onClick={() => setShowChatbot(true)}
        >
          <FaCommentDots className="text-2xl" />
        </Button>
      </div>

      {/* Chatbot Modal */}
      <Modal
        show={showChatbot}
        onClose={() => setShowChatbot(false)}
        size="lg"
      >
        <Modal.Header>
          {t.chatbotTitle}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-600">Hi there! I'm your coconut farming assistant. How can I help you today?</p>
            </div>
            
            <div className="space-y-2">
              <Button size="sm" color="light" onClick={() => {}} className="w-full text-left">
                {t.chatbotPrompt1}
              </Button>
              <Button size="sm" color="light" onClick={() => {}} className="w-full text-left">
                {t.chatbotPrompt2}
              </Button>
              <Button size="sm" color="light" onClick={() => {}} className="w-full text-left">
                {t.chatbotPrompt3}
              </Button>
            </div>
            
            <div className="flex mt-4">
              <input
                type="text"
                className="flex-1 rounded-l-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your question here..."
              />
              <Button color="blue" className="rounded-l-none">
                                <FaCommentDots className="mr-2" />
                Send
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Emergency Modal */}
      <Modal
        show={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        size="xl"
      >
        <Modal.Header>
          {t.emergencyTitle}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 font-medium">
                <FaBell className="inline-block mr-2" />
                Urgent Action Required: A new disease outbreak has been detected in your area. Please book an inspection immediately to protect your crops.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold mb-2">Symptoms to Look For:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Yellowing or browning of leaves</li>
                  <li>Unusual spots or lesions on the trunk</li>
                  <li>Premature nut drop</li>
                  <li>Visible pests or larvae</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-2">Recommended Actions:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Isolate affected trees immediately</li>
                  <li>Avoid moving plant material from your farm</li>
                  <li>Book an inspection with a certified officer</li>
                  <li>Follow quarantine protocols</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                color="failure" 
                size="lg" 
                onClick={() => {
                  // Handle booking logic here
                  setShowEmergencyModal(false);
                }}
              >
                <FaCalendarAlt className="mr-2" />
                {t.bookNow}
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowEmergencyModal(false)}>
            {t.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}