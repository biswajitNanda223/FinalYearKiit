import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const MedicalReportNER = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze-report/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("❌ Upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-6xl text-gray-800"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-purple-800">📄 Medical Report Analyzer</h2>
        <p className="text-center text-gray-700 mb-6 text-base">
          Upload your PDF report to extract <strong>symptoms</strong>, get <strong>recommended medicines</strong>,
          and view <strong>price comparisons</strong>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <label className="w-full bg-white border-2 border-dashed border-purple-300 rounded-xl p-6 text-center cursor-pointer hover:bg-purple-50 transition shadow-md">
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            <span className="text-base font-medium text-purple-700">
              {file ? `📁 ${file.name}` : "📤 Click to upload PDF file"}
            </span>
          </label>

          <motion.button
            type="submit"
            className="px-8 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "⏳ Analyzing..." : "🚀 Analyze Report"}
          </motion.button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 space-y-8 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100"
          >
            <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">🩺 Extracted Symptoms</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                {result.symptoms?.length > 0 ? (
                  result.symptoms.map((symptom, i) => <li key={i}>{symptom}</li>)
                ) : (
                  <li className="italic text-gray-500">No symptoms found.</li>
                )}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-purple-200 shadow-md">
              <h3 className="text-xl font-semibold text-purple-800 mb-5">
                💊 Medicine Recommendations & Price Comparison
              </h3>

              {Object.entries(result.links || {}).length > 0 ? (
                <div className="overflow-x-auto rounded-xl shadow-sm">
                  <table className="min-w-full border border-purple-200 overflow-hidden rounded-xl text-sm text-left text-gray-800">
                    <thead className="bg-purple-100 text-purple-800 uppercase text-xs font-bold">
                      <tr>
                        <th className="px-6 py-3">Medicine</th>
                        <th className="px-6 py-3">Source</th>
                        <th className="px-6 py-3">Buy Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-100">
                      {Object.entries(result.links).map(([medicine, sources]) =>
                        Array.isArray(sources) && sources.length > 0 ? (
                          sources.map(([source, url], idx) => (
                            <tr key={`${medicine}-${idx}`} className="hover:bg-purple-50 transition duration-200">
                              <td className="px-6 py-3 font-medium text-purple-900">
                                {idx === 0 ? medicine : ""}
                              </td>
                              <td className="px-6 py-3">{source}</td>
                              <td className="px-6 py-3">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline flex items-center gap-1"
                                >
                                  Visit <ExternalLink size={16} />
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr key={medicine} className="bg-purple-50">
                            <td className="px-6 py-3 font-medium text-purple-900">{medicine}</td>
                            <td colSpan="2" className="px-6 py-3 italic text-gray-500">
                              No links available
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="italic text-gray-500">No pricing links available.</p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MedicalReportNER;
