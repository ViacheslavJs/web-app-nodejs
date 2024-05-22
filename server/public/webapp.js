document.addEventListener('DOMContentLoaded', async () => {
    const messages = document.querySelector('.messages');
    const loadingMessage = document.createElement('span');
    loadingMessage.textContent = 'Loading...';
    messages.appendChild(loadingMessage);

    const elementsContainers = document.querySelectorAll('.card');

    // Скрыть все элементы при загрузке
    elementsContainers.forEach(container => {
        container.style.display = 'none';
    });

    try {
        const response = await fetch('/products');
        //const response = await fetch('http://localhost:10000/products');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        messages.removeChild(loadingMessage);

        if (data.length === 0) {
            const emptyMessage = document.createElement('span');
            emptyMessage.textContent = 'No products found';
            messages.appendChild(emptyMessage);          
        } else {
            data.forEach((product, index) => {
                const productName = elementsContainers[index].querySelector('.card__span-name');
                const productPrice = elementsContainers[index].querySelector('.card__span-price');
                const productImage = elementsContainers[index].querySelector('.card__image');
                productName.textContent = product.name;
                productPrice.textContent = product.price;                
                productImage.src = product.image;
                // Показать контейнеры с продуктами после успешной загрузки данных
                elementsContainers[index].style.display = 'block';
            });
        }
    } catch (error) {     
        messages.removeChild(loadingMessage);
        const errorMessage = document.createElement('span');
        errorMessage.textContent = 'Server is not available';
        messages.appendChild(errorMessage);      
        console.error('Error fetching products:', error);
    }
});

