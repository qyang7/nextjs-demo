export default function Register() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="rounded-xl bg-white px-8 py-10 shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-black mb-6">Register Page</h1>
        <p className="text-gray-600 mb-8">Welcome to the register page.</p>
        
        <form className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors mt-6"
          >
            Register
          </button>
        </form>
        
        <p className="text-sm text-gray-500 mt-6">
          Already have an account? <a href="/login" className="text-pink-500 hover:text-pink-600 font-medium">Login here</a>
        </p>
      </div>
    </main>
  );
}
