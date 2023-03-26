import "./Modal.css"

import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/all'


// Modal component
export default function Modal({header, children, isOpen, onClose}) {
  return (isOpen && (
        <div className='modal-overlay' onClick={onClose}>
          <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{header}</h2>
              <AiOutlineCloseCircle className='modal-close' onClick={onClose}></AiOutlineCloseCircle>
            </div>
            <div className="modal-content">
                {children}
            </div>
          </div>
        </div>
    )
  )
}
