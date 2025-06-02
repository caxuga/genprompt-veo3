import React, { useState, useEffect } from 'react';

// Main App component for the Veo3 Prompt Generator
function App() {
  // State variables for each input field
  const [subject, setSubject] = useState('');
  const [action, setAction] = useState('');
  const [expression, setExpression] = useState('');
  const [place, setPlace] = useState('');
  const [time, setTime] = useState('');
  const [cameraMovement, setCameraMovement] = useState('');
  const [lighting, setLighting] = useState('');
  const [videoStyle, setVideoStyle] = useState('');
  const [videoAtmosphere, setVideoAtmosphere] = useState('');
  const [soundMusic, setSoundMusic] = useState('');
  const [spokenWords, setSpokenWords] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  // State variables for generated prompts
  const [indonesianPrompt, setIndonesianPrompt] = useState('');
  const [englishPrompt, setEnglishPrompt] = useState('');

  // Options for dropdowns
  const timeOptions = [
    { id: '', name: 'Pilih Waktu' },
    { id: 'pagi hari', name: 'Pagi hari' },
    { id: 'siang hari', name: 'Siang hari' },
    { id: 'sore hari', name: 'Sore hari' },
    { id: 'malam hari', name: 'Malam hari' },
    { id: 'saat senja', name: 'Saat senja' },
    { id: 'saat fajar', name: 'Saat fajar' },
  ];

  const cameraMovementOptions = [
    { id: '', english: 'Select Camera Movement', indonesian: 'Pilih Gerakan Kamera' },
    { id: 'static_shot', english: 'Static Shot', indonesian: 'Bidikan Statis' },
    { id: 'panning', english: 'Panning', indonesian: 'Geser Mendatar' },
    { id: 'tilting', english: 'Tilting', indonesian: 'Geser Vertikal' },
    { id: 'zoom_in', english: 'Zoom In', indonesian: 'Mendekat' },
    { id: 'zoom_out', english: 'Zoom Out', indonesian: 'Menjauh' },
    { id: 'tracking_shot', english: 'Tracking Shot', indonesian: 'Mengikuti Subjek' },
    { id: 'crane_shot', english: 'Crane Shot', indonesian: 'Bidikan Derek' },
    { id: 'dolly_shot', english: 'Dolly Shot', indonesian: 'Bidikan Bergerak Maju/Mundur' },
    { id: 'pedestal_shot', english: 'Pedestal Shot', indonesian: 'Bidikan Naik/Turun Vertikal' },
    { id: 'arc_shot', english: 'Arc Shot', indonesian: 'Bidikan Melengkung' },
    { id: 'boom_shot', english: 'Boom Shot', indonesian: 'Bidikan Boom' },
    { id: 'handheld', english: 'Handheld', indonesian: 'Genggam' },
    { id: 'steadicam', english: 'Steadicam', indonesian: 'Steadicam' },
    { id: '3d_rotation', english: '3D Rotation', indonesian: 'Rotasi 3D' },
    { id: 'circular_dolly', english: 'Circular Dolly', indonesian: 'Dolly Melingkar' },
    { id: 'fly_through', english: 'Fly Through', indonesian: 'Terbang Melewati' },
    { id: 'spiral_zoom', english: 'Spiral Zoom', indonesian: 'Zoom Spiral' },
    { id: 'vertigo_effect', english: 'Vertigo Effect', indonesian: 'Efek Vertigo' },
  ];

  const lightingOptions = [
    { id: '', name: 'Pilih Pencahayaan', english: 'Select Lighting' },
    { id: 'natural', name: 'Natural', english: 'Natural' },
    { id: 'studio_lighting', name: 'Studio Lighting', english: 'Studio Lighting' },
    { id: 'rembrandt_lighting', name: 'Rembrandt Lighting', english: 'Rembrandt Lighting' },
    { id: 'cinematic_lighting', name: 'Cinematic Lighting', english: 'Cinematic Lighting' },
    { id: 'soft_lighting', name: 'Soft Lighting', english: 'Soft Lighting' },
    { id: 'hard_lighting', name: 'Hard Lighting', english: 'Hard Lighting' },
    { id: 'ambient_light', name: 'Ambient Light', english: 'Ambient Light' },
  ];

  const videoStyleOptions = [
    { id: '', name: 'Pilih Gaya Video', english: 'Select Video Style' },
    { id: 'realistis', name: 'Realistis', english: 'Realistic' },
    { id: 'sinematik', name: 'Sinematik', english: 'Cinematic' },
    { id: 'kartun', name: 'Kartun', english: 'Cartoon' },
    { id: 'anime', name: 'Anime', english: 'Anime' },
    { id: 'lukisan', name: 'Lukisan', english: 'Painting' },
    { id: 'sketsa', name: 'Sketsa', english: 'Sketch' },
    { id: 'stop_motion', name: 'Stop Motion', english: 'Stop Motion' },
    { id: 'time_lapse', name: 'Time-lapse', english: 'Time-lapse' },
  ];

  const videoAtmosphereOptions = [
    { id: '', name: 'Pilih Suasana Video', english: 'Select Video Atmosphere' },
    { id: 'epik', name: 'Epik', english: 'Epic' },
    { id: 'misterius', name: 'Misterius', english: 'Mysterious' },
    { id: 'bahagia', name: 'Bahagia', english: 'Happy' },
    { id: 'sedih', name: 'Sedih', english: 'Sad' },
    { id: 'tegang', name: 'Tegang', english: 'Tense' },
    { id: 'santai', 'name': 'Santai', english: 'Relaxed' },
    { id: 'futuristik', name: 'Futuristik', english: 'Futuristic' },
    { id: 'nostalgia', name: 'Nostalgia', english: 'Nostalgic' },
  ];

  // Function to get the English translation for a given Indonesian option
  const getEnglishTranslation = (options, selectedId) => {
    const option = options.find(opt => opt.id === selectedId);
    return option ? option.english : '';
  };

  // Function to generate the prompts
  const generatePrompt = () => {
    // Construct the Indonesian prompt
    let indoPrompt = `Ciptakan visualisasi`;
    if (subject) indoPrompt += ` ${subject}`;
    if (expression) indoPrompt += ` dengan ekspresi ${expression}`;
    if (action) indoPrompt += `, yang sedang ${action}`;
    if (place) indoPrompt += ` di ${place}`;
    if (time) indoPrompt += ` pada ${time}`;
    indoPrompt += `.`;

    if (cameraMovement) {
      const selectedCamera = cameraMovementOptions.find(opt => opt.id === cameraMovement);
      if (selectedCamera) {
        indoPrompt += ` Gunakan ${selectedCamera.indonesian} untuk menangkap momen ini`;
      }
    }
    if (lighting) {
      const selectedLighting = lightingOptions.find(opt => opt.id === lighting);
      if (selectedLighting) {
        indoPrompt += ` dengan pencahayaan ${selectedLighting.name}`;
      }
    }
    indoPrompt += `.`;

    if (videoStyle) {
      const selectedStyle = videoStyleOptions.find(opt => opt.id === videoStyle);
      if (selectedStyle) {
        indoPrompt += ` Tampilkan dengan gaya ${selectedStyle.name}`;
      }
    }
    if (videoAtmosphere) {
      const selectedAtmosphere = videoAtmosphereOptions.find(opt => opt.id === videoAtmosphere);
      if (selectedAtmosphere) {
        indoPrompt += ` yang memberikan suasana ${selectedAtmosphere.name}`;
      }
    }
    if (soundMusic) indoPrompt += `, diiringi dengan ${soundMusic}`;
    indoPrompt += `.`;

    if (additionalDetails) indoPrompt += ` Tambahkan detail tambahan berupa ${additionalDetails}.`;
    if (spokenWords) indoPrompt += ` Kalimat yang diucapkan: "${spokenWords}".`;

    setIndonesianPrompt(indoPrompt.trim());

    // Construct the English prompt
    let engPrompt = `Visualize`;
    if (subject) engPrompt += ` ${subject}`;
    if (expression) engPrompt += ` with a ${expression} expression`;
    if (action) engPrompt += `, who is ${action}`;
    if (place) engPrompt += ` in ${place}`;
    if (time) engPrompt += ` during ${getEnglishTranslation(timeOptions, time) || time}`; // Time needs manual mapping if not direct
    engPrompt += `.`;

    if (cameraMovement) {
      const selectedCamera = cameraMovementOptions.find(opt => opt.id === cameraMovement);
      if (selectedCamera) {
        engPrompt += ` Employ a ${selectedCamera.english} to capture this moment`;
      }
    }
    if (lighting) {
      const selectedLighting = lightingOptions.find(opt => opt.id === lighting);
      if (selectedLighting) {
        engPrompt += ` with ${selectedLighting.english} lighting`;
      }
    }
    engPrompt += `.`;

    if (videoStyle) {
      const selectedStyle = videoStyleOptions.find(opt => opt.id === videoStyle);
      if (selectedStyle) {
        engPrompt += ` Render it in a ${selectedStyle.english} style`;
      }
    }
    if (videoAtmosphere) {
      const selectedAtmosphere = videoAtmosphereOptions.find(opt => opt.id === videoAtmosphere);
      if (selectedAtmosphere) {
        engPrompt += ` that evokes a ${selectedAtmosphere.english} atmosphere`;
      }
    }
    if (soundMusic) engPrompt += `, accompanied by ${soundMusic}`;
    engPrompt += `.`;

    if (additionalDetails) engPrompt += ` Add the extra detail of ${additionalDetails}.`;
    if (spokenWords) engPrompt += ` Spoken words: "${spokenWords}".`; // Spoken words remain in original language

    setEnglishPrompt(engPrompt.trim());
  };

  // Tailwind CSS classes for consistent styling
  // Updated color scheme for a more attractive accent
  const inputClass = "w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200";
  const labelClass = "block text-purple-900 text-sm font-bold mb-1"; // Adjusted for dark background
  const sectionTitleClass = "text-xl font-bold text-purple-800 mb-4 border-b-2 border-purple-500 pb-2"; // Adjusted for dark background
  const buttonClass = "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2";
  const promptOutputClass = "w-full p-3 border border-purple-300 rounded-md bg-purple-50 font-mono text-sm resize-y overflow-auto h-40";


  return (
    // Main container with responsive padding and background
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-4 sm:p-8 font-sans antialiased"> {/* Updated background */}
      {/* Application Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-white to-purple-500 bg-clip-text text-transparent leading-tight mb-2"> {/* Updated for gradient text */}
          Prompt Generator Veo3
        </h1>
        <p className="text-xl sm:text-2xl text-gray-400 font-medium">by Caksoega</p> {/* Adjusted for dark background */}
      </header>

      {/* Main content area */}
      <main className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-purple-200">
        {/* Input fields section */}
        <section className="mb-8">
          <h2 className={sectionTitleClass}>Detail Prompt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className={labelClass}>1. Subjek</label>
              <input
                type="text"
                id="subject"
                className={inputClass}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Seorang astronot wanita muda"
              />
            </div>
            {/* Action Input */}
            <div>
              <label htmlFor="action" className={labelClass}>2. Aksi</label>
              <input
                type="text"
                id="action"
                className={inputClass}
                value={action}
                onChange={(e) => setAction(e.target.value)}
                placeholder="Contoh: sedang melayang dan menanam bendera"
              />
            </div>
            {/* Expression Input */}
            <div>
              <label htmlFor="expression" className={labelClass}>3. Ekspresi</label>
              <input
                type="text"
                id="expression"
                className={inputClass}
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Contoh: penuh semangat dan tersenyum lebar"
              />
            </div>
            {/* Place Input */}
            <div>
              <label htmlFor="place" className={labelClass}>4. Tempat</label>
              <input
                type="text"
                id="place"
                className={inputClass}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Contoh: di permukaan bulan yang berbatu"
              />
            </div>
            {/* Time Dropdown */}
            <div>
              <label htmlFor="time" className={labelClass}>5. Waktu</label>
              <select
                id="time"
                className={inputClass}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {timeOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            {/* Camera Movement Dropdown */}
            <div>
              <label htmlFor="cameraMovement" className={labelClass}>6. Gerakan Kamera</label>
              <select
                id="cameraMovement"
                className={inputClass}
                value={cameraMovement}
                onChange={(e) => setCameraMovement(e.target.value)}
              >
                {cameraMovementOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.english} ({option.indonesian})
                  </option>
                ))}
              </select>
            </div>
            {/* Lighting Dropdown */}
            <div>
              <label htmlFor="lighting" className={labelClass}>7. Pencahayaan</label>
              <select
                id="lighting"
                className={inputClass}
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
              >
                {lightingOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            {/* Video Style Dropdown */}
            <div>
              <label htmlFor="videoStyle" className={labelClass}>8. Gaya Video</label>
              <select
                id="videoStyle"
                className={inputClass}
                value={videoStyle}
                onChange={(e) => setVideoStyle(e.target.value)}
              >
                {videoStyleOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            {/* Video Atmosphere Dropdown */}
            <div>
              <label htmlFor="videoAtmosphere" className={labelClass}>9. Suasana Video</label>
              <select
                id="videoAtmosphere"
                className={inputClass}
                value={videoAtmosphere}
                onChange={(e) => setVideoAtmosphere(e.target.value)}
              >
                {videoAtmosphereOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            {/* Sound or Music Input */}
            <div>
              <label htmlFor="soundMusic" className={labelClass}>10. Suara atau Musik</label>
              <input
                type="text"
                id="soundMusic"
                className={inputClass}
                value={soundMusic}
                onChange={(e) => setSoundMusic(e.target.value)}
                placeholder="Contoh: Musik orkestra yang megah"
              />
            </div>
            {/* Spoken Words Input */}
            <div>
              <label htmlFor="spokenWords" className={labelClass}>11. Kalimat yang Diucapkan</label>
              <input
                type="text"
                id="spokenWords"
                className={inputClass}
                value={spokenWords}
                onChange={(e) => setSpokenWords(e.target.value)}
                placeholder="Contoh: Ini adalah langkah kecil bagi manusia..."
              />
            </div>
            {/* Additional Details Textarea */}
            <div className="md:col-span-2">
              <label htmlFor="additionalDetails" className={labelClass}>12. Detail Tambahan</label>
              <textarea
                id="additionalDetails"
                className={`${inputClass} h-24`}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Contoh: Debu bulan beterbangan halus di sekitar kaki astronot"
              ></textarea>
            </div>
          </div>
          {/* Generate Prompt Button */}
          <div className="mt-8">
            <button onClick={generatePrompt} className={buttonClass}>
              Generate Prompt
            </button>
          </div>
        </section>

        {/* Generated Prompts Section */}
        <section className="mt-8">
          <h2 className={sectionTitleClass}>Hasil Prompt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian Prompt (Editable) */}
            <div>
              <label htmlFor="indonesianPrompt" className={labelClass}>Prompt Bahasa Indonesia (Dapat Diedit)</label>
              <textarea
                id="indonesianPrompt"
                className={promptOutputClass}
                value={indonesianPrompt}
                onChange={(e) => setIndonesianPrompt(e.target.value)}
                readOnly={false} // This is editable
              ></textarea>
            </div>
            {/* English Prompt (Non-editable) */}
            <div>
              <label htmlFor="englishPrompt" className={labelClass}>Final Prompt Bahasa Inggris (Tidak Dapat Diedit)</label>
              <textarea
                id="englishPrompt"
                className={promptOutputClass}
                value={englishPrompt}
                readOnly={true} // This is not editable
              ></textarea>
            </div>
          </div>
        </section>
      </main>

      {/* Tailwind CSS CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
    </div>
  );
}

export default App;
