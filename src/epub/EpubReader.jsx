import React, { useState, useEffect, useCallback } from "react";
import ePub from "epubjs";

function EpubReader({ epubUrl }) {
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [fontSize, setFontSize] = useState(16); // Default font size in pixels
  const [chapters, setChapters] = useState([]);
  console.log(book, "Bookkkkkkk");
  console.log(chapters, "chapter");
  console.log(book?.navigation?.toc, "tocDatttttaaaa");

  const navigationData = useCallback(async () => {
    const tempBook = ePub(epubUrl);
    const nav = await tempBook.loaded.navigation;
    console.log(nav, "nav");
    /*
    
    Navigation {toc: Array(20), tocByHref: {…}, tocById: {…}, landmarks: Array(0), landmarksByType: {…}, …}
    */
    //how to access the toc array
    const toc = await nav.toc;
    console.log(toc, "toccccccc");

    var rendition = tempBook.renderTo("viewer", { width: 650, height: 200 });
    rendition.display();
    setBook(tempBook);
    setRendition(rendition);
    setChapters(toc);
  }, []);

  useEffect(() => {
    navigationData();
  }, [navigationData]);

  //   useEffect(() => {
  //     const loadBook = async () => {
  //       const tempBook = ePub(epubUrl);

  //       var rendition = tempBook.renderTo("viewer", { width: 600, height: 400 });
  //       rendition.display();

  //       // console.log(book.navigation.toc)

  //       // console.log('1', book.spine.first(), rendition)
  //       // // const spineItems = book.spine?.items;
  //       // // const loadedChapters = await Promise.all(spineItems.map(async (item) => {
  //       // //   const chapter = await item.load();
  //       // //   return {
  //       // //     id: item.idref,
  //       // //     title: chapter.label,
  //       // //     href: item.href,
  //       // //   };
  //       // // }));
  //       setBook(tempBook);
  //       setRendition(rendition);
  //       setChapters([]);
  //     };
  //     loadBook();
  //     return () => {
  //       if (book) {
  //         book.destroy();
  //       }
  //     };
  //   }, [epubUrl]);

  useEffect(() => {
    if (rendition) {
      rendition.themes.fontSize(fontSize + "px");
    }
  }, [fontSize, rendition]);

  const handleNextPage = () => {
    if (rendition) {
      rendition.next();
    }
  };

  const handlePrevPage = () => {
    if (rendition) {
      rendition.prev();
    }
  };

  const handleIncrementFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const handleDecrementFontSize = () => {
    setFontSize(fontSize - 1);
  };

  const renderBook = () => {
    if (!book) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1
          style={{
            color: "red",
          }}
        >
          {book.title}
        </h1>
        <p
          style={{
            color: "white",
          }}
        >
          Total Pages: {book.spine.length}
        </p>
        <div id="viewer"></div>
        <button onClick={handleNextPage}>Next Page</button>
        <button onClick={handlePrevPage}>Prev Page</button>
        <button onClick={handleIncrementFontSize}>Increment Font Size</button>
        <button onClick={handleDecrementFontSize}>Decrement Font Size</button>
      </div>
    );
  };

  return <div>{renderBook()}</div>;
}

export default EpubReader;
