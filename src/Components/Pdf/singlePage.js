import React, { useState } from 'react'

// React-Pdf
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

// Scss
import './../../SCSS/singlePage.scss'

// Sample Pdf
import SamplePDF from './../../Assets/LCS2019061_Ajay.pdf'

// Animation
import LottieAnimation from './../../Animations/Leaf_Animation/Leaf_Animation.js'
import Loading from './../../Animations/Loading2.json'

export const SinglePage = (props) => {

    // Hooks for setting No of Page
    const [numPages, setNumPages] = useState(null)

    // Hooks for Setting Page No
    const [page, setPageNumber] = useState(1)


    // Document Loading
    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
        setPageNumber(1)
    }

    // To change Page
    const changePage = (offset) => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset)
    }

    // To go to next Page
    const nextPage = () => changePage(1)

    // To go to previous Page
    const prevPage = () => changePage(-1)

    const { pdf } = props
    console.log(pdf)

    return (

        <div>
            <Document 
                file = {pdf ? (pdf) : (SamplePDF)}
                options = {{ workerSrc: '/pdf.worker.js'}}
                onLoadSuccess = {onDocumentLoadSuccess}
                className = "PdfPreview"
                loading = {
                    <div className = "Please_Wait">
                        <LottieAnimation lotti = {Loading} width = "100%"></LottieAnimation>
                        <div>Loading your Pdf</div>
                    </div>
                }>
                
                <Page pageNumber = {page}/>
            </Document>


        </div>
    )

}

export default SinglePage