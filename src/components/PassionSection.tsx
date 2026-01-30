import { useState } from 'react'
import { getColors } from '../config/colors'

interface PassionSectionProps {
  colors: ReturnType<typeof getColors>
}

function PassionSection({ colors }: PassionSectionProps) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  // 3 rows x 5 columns = 15 slots
  const totalSlots = 15
  const slots = Array.from({ length: totalSlots }, (_, i) => i)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Passion for
            </h2>
          </div>

          {/* Right Side - Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
              {slots.map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSlot(index)}
                  className="aspect-square rounded-lg overflow-hidden transition-opacity hover:opacity-100 opacity-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ 
                    backgroundColor: colors.chip.bg,
                  }}
                >
                  {index === 0 ? (
                    // First slot - placeholder for image
                    <div className="w-full h-full flex items-center justify-center">
                      <div 
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: colors.chip.bg }}
                      />
                    </div>
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedSlot !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSlot(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            aria-hidden="true"
          />
          {/* Modal content */}
          <div
            className="relative rounded-lg shadow-xl max-w-md w-full p-6"
            style={{
              backgroundColor: colors.background.bg,
              color: colors.background.text,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 id="modal-title" className="text-xl font-light">
                Passion #{selectedSlot + 1}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                style={{ color: colors.background.text }}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p style={{ color: colors.secondary.text }}>
              Content for this passion will go here.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default PassionSection
