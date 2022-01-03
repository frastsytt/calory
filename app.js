const ItemCtrl = (function(){
	const Item = function(id, name, calories){
		this.id = id
		this.name = name
		this.calories = calories
	}
	const data = {
		items: [
			{id: 0, name: 'Steak', calories: 1200},
			{id: 1, name: 'Cookie', calories: 400},
			{id: 2, name: 'Eggs', calories: 300},
		],
		total: 0
	}
	return {
		logData: function(){
			return data
		},
		getItems: function(){
			return	data.items
		},
		addItem: function(name, calories){
			console.log(name)
			console.log(calories)
			let ID;
			if(data.items.length > 0){
				ID = data.items[data.items.length - 1].id + 1
				console.log(ID)
			} else {
				ID = 0
			}
			calories = parseInt(calories);
			newItem = new Item(ID, name, calories);
			data.items.push(newItem);
			return newItem
		}
	}

})();

const UICtrl = (function (){
	console.log('I am the UICtrl')
	const UISelectors = {
		itemList: '#item-list',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		addBtn: '.waves-effect'
	}
	return {
		populateItemList: function(items){
			let html = ''
			items.forEach(function(item){
				html += `<li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong><em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
				</li>`;
			});
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getSelectors: function(){
			return UISelectors;
		},
		getItemInput: function(){
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		}
	}
})();

const App = (function (ItemCtrl, UICtrl){
	console.log(ItemCtrl.logData())

	const loadEventListeners = function(){
		console.log('Event listener')
		const UISelectors = UICtrl.getSelectors()
		console.log(UISelectors)
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
	}

	const itemAddSubmit = function(event){
		console.log('Item add event functio')
		const input = UICtrl.getItemInput()
		if(input.name !== '' && input.calories !== ''){
			console.log('That is a valid input')
			console.log(input)
			ItemCtrl.addItem(input.name, input.calories)
		}
		event.preventDefault()
	}

	return {
		init: function(){
			console.log('I am the App')
			const items = ItemCtrl.getItems()
			UICtrl.populateItemList(items)
			loadEventListeners()
		}
	}
})(ItemCtrl, UICtrl);

App.init()