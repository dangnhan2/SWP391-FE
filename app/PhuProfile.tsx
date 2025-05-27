 const PhuProfile= () => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Information</h1>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-500 mb-2">Full Name</h2>
                <p className="text-xl font-semibold text-gray-900">Vo Dai Phu</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium text-gray-500 mb-2">Student ID</h2>
                <p className="text-xl font-semibold text-gray-900">qe180138</p>
              </div>
              
              <div className="pb-6">
                <h2 className="text-lg font-medium text-gray-500 mb-2">Email</h2>
                <a 
                  href="mailto:phuvdqe180138@fpt.edu.vn"
                  className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  phuvdqe180138@fpt.edu.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    )
} 

export default PhuProfile;