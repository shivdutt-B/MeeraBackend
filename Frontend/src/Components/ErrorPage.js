import React from 'react'
import ErrorPoster from "../Assets/error.png"

function ErrorPage() {
  return (
    <div className="main">
        <div className="gutter">
            <div className="error-container">
                <img src={ErrorPoster}></img>
                <strong>SOME ERROR OCCURED</strong>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage