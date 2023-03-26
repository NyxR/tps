import "./modal.css"

import React from 'react'


// Modal component
export default function Modal({children, isOpen, onClose}) {
  return (isOpen && (
        <div className='modal-overlay' onClick={onClose}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
                {children}
                <button className='modal-close' onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
    )
  )
}
