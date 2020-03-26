import React from 'react';

function Product(props) {
    
    return (
        
            <div class="col-12 col-sm-6 col-lg-4" class="product-container">              
                <section class="product-box">

                    <a href="#"> 
                        {/*IMAGEN*/}
                        <figure class="product-box_image">
                            <img src="/images/products/" alt="imagen de producto" />
                        </figure>
                        {/*PRECIO, DESCUENTO y NOMBRE*/}
                        <article class="product-box_data">
                            <h2>Precio</h2>
                            <span>Descuento</span>
                            <p>Nombre</p>  
                        </article>
                    </a>
                </section>          
            </div>
	)
}

export default Product;