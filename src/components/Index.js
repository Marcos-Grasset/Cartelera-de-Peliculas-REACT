import React from "react";
import Carousel from "./Carousel";
import Ranking from "./Ranking";
import Header from "./Header";

import estrenoGif from '../images/Estrenos.gif';
import proximoGif from '../images/próximamente.gif';


const Index = () => {
    return (
        <>
            <Header /> {/* Render the Header here */}
            <main>
                <section id="generos">
                    <h2>
                        <img
                            src={estrenoGif}
                            alt="Gif de estrenos"
                            className="gif-header"
                        />
                    </h2>
                    <Carousel />
                </section>
                <div className="contenido">
                    <Ranking />
                    <section id="video">
                        <h2>
                            <img
                            src={proximoGif}
                            alt="Gif de video"
                                className="gif-header"
                            />
                        </h2>
                        <iframe
                            width="560"
                            height="580"
                            src="https://www.youtube.com/embed/z8iYQHFZcv8?si=tPQRgH-18_KiBfqN"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </section>
                </div>
            </main>
        </>
    );
}

export default Index;
