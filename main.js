
    // Функция для добавления товара
    function addItem() {
        // Получаем данные из формы
        var itemName = document.getElementById('itemName').value;
        var itemDescription = document.getElementById('itemDescription').value;
        var itemPrice = parseFloat(document.getElementById('itemPrice').value);
        var itemQuantity = parseInt(document.getElementById('itemQuantity').value);

        // Проверка наличия всех данных
        if (!itemName || !itemDescription || isNaN(itemPrice) || isNaN(itemQuantity)) {
            alert('Заполните все поля корректно.');
            return;
        }

        // Отправляем запрос на сервер для добавления товара
        fetch('/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itemName: itemName,
                itemDescription: itemDescription,
                itemPrice: itemPrice,
                itemQuantity: itemQuantity,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Обновляем интерфейс с новыми данными
            updateInterface(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при добавлении товара.');
        });
    }

    // Функция для обновления интерфейса после добавления товара
    function updateInterface(data) {
        // Очищаем форму
        document.getElementById('addItemForm').reset();

        // Обновляем таблицу с товарами
        var inventoryTable = document.getElementById('inventory');
        var newRow = inventoryTable.insertRow(-1);

        // Добавляем ячейки с данными товара
        var cellId = newRow.insertCell(0);
        var cellName = newRow.insertCell(1);
        var cellDescription = newRow.insertCell(2);
        var cellPrice = newRow.insertCell(3);
        var cellQuantity = newRow.insertCell(4);

        // Заполняем ячейки данными
        cellId.innerHTML = data.itemId;
        cellName.innerHTML = data.itemName;
        cellDescription.innerHTML = data.itemDescription;
        cellPrice.innerHTML = data.itemPrice;
        cellQuantity.innerHTML = data.itemQuantity;
    }
