function showPortfolio(img) {
    const grid = document.getElementsByClassName('image-grid');
   
    const folio = document.createElement('img');
    folio.src = "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" //sample image
    
    document.getElementById('img-grid').appendChild(folio);
    
    /** (sample) Some loop logic to get the data from DB and show the content */
    // var x = 1;
    // while(x < 5)
    // {
    //     const folio = document.createElement('img');
    //     folio.src = "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     x++;
    //     document.getElementById('img-grid').appendChild(folio);
    // }
}