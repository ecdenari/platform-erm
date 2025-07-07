import React from 'react'

const LayoutBoundsTest: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">Layout Bounds Test</h3>
        <p className="text-sm text-green-700">
          This content should stay within the viewport boundaries and not cause horizontal scrolling.
        </p>
      </div>

      <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Content Width Test</h3>
        <div className="bg-blue-200 h-4 w-full rounded mb-2"></div>
        <div className="bg-blue-200 h-4 w-3/4 rounded mb-2"></div>
        <div className="bg-blue-200 h-4 w-1/2 rounded"></div>
      </div>

      <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Long Content Test</h3>
        <p className="text-sm text-yellow-700">
          This is a very long line of text that should wrap properly and not extend beyond the content area causing horizontal scroll bars to appear which would indicate layout issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-100 border border-gray-300 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Card {i + 1}</h4>
            <p className="text-sm text-gray-600">
              Sample card content that should fit within the grid layout.
            </p>
          </div>
        ))}
      </div>

      <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">Viewport Check</h3>
        <p className="text-sm text-red-700">
          If you can see this entire red border without horizontal scrolling, the layout is working correctly.
        </p>
      </div>
    </div>
  )
}

export default LayoutBoundsTest