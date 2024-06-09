<script lang="ts">
	import DataGrid, {
		type GridAction,
		type GridDataRow,
		type GridField
	} from '$liwe3/components/DataGrid.svelte';

	import { PencilSquare, Trash } from 'svelte-hero-icons';
	import {
		product_admin_add,
		product_admin_details,
		product_admin_fields,
		product_admin_list
	} from '../actions';
	import { onMount } from 'svelte';
	import type { Product } from '../types';
	import Button from '$liwe3/components/Button.svelte';
	import Modal from '$liwe3/components/Modal.svelte';
	import ProductEdit from './ProductEdit.svelte';
	import { categoryStoreList, categoriesLoad } from '$modules/category/store.svelte';

	const fields: GridField[] = [
		{ name: 'id', label: 'ID', type: 'string', hidden: true },
		{ name: 'name', label: 'Name', type: 'string', filterable: true },
		{ name: 'description', label: 'Description', type: 'string' },
		{ name: 'price', label: 'Price', type: 'number' },
		{ name: 'quantity', label: 'Quantity', type: 'number' },
		{
			name: 'category',
			label: 'Category',
			type: 'string',
			render: (value: string, row: GridDataRow) => {
				return categoryStoreList[value]?.title ?? '';
			}
		}
	];

	const actions: GridAction[] = [
		{
			id: 'edit',
			label: 'Edit',
			icon: PencilSquare,
			action: (row: GridDataRow) => {
				editProduct(row);
			}
		},
		{
			id: 'delete',
			label: 'Delete',
			icon: Trash,
			mode: 'danger',
			action: (row: GridDataRow) => {
				console.log('Delete', row);
			}
		}
	];

	let data: GridDataRow[] = $state([]);
	let editProductModal = $state(false);
	let currProduct: Product | null = $state(null);

	const createNewProduct = () => {
		currProduct = {
			id: ''
		};

		editProductModal = true;
	};

	const editProduct = async (row: GridDataRow) => {
		const prod: Product = await product_admin_details(row.id);

		currProduct = prod;

		editProductModal = true;
	};

	const onsave = async (data: Record<string, any>) => {
		console.log('Save', data);

		if (!currProduct) return;

		Object.assign(currProduct, data);

		let res: any;

		if (currProduct.id === '') {
			res = await product_admin_add(
				currProduct.name ?? '',
				currProduct.code,
				currProduct.id_maker,
				currProduct.id_category,
				currProduct.id_availability,
				currProduct.code_forn,
				currProduct.sku,
				currProduct.description,
				currProduct.short_description,
				currProduct.url,
				currProduct.cost,
				currProduct.price_net,
				currProduct.price_vat,
				currProduct.curr_price_net,
				currProduct.curr_price_vat,
				currProduct.vat,
				currProduct.free,
				currProduct.discount,
				currProduct.quant,
				currProduct.ordered,
				currProduct.available,
				currProduct.level,
				currProduct.visible,
				currProduct.relevance,
				currProduct.status,
				currProduct.weight,
				currProduct.width,
				currProduct.height,
				currProduct.depth,
				currProduct.tags,
				currProduct.single
			);
		} else {
			res = await product_admin_fields(currProduct.id, currProduct);
		}

		await updateProducts();
		editProductModal = false;
	};

	const updateProducts = async () => {
		const prods: Product[] | any = await product_admin_list();

		if (prods.error) return;

		if (!prods) return;

		data = [];

		prods.forEach((prod: Product) => {
			data.push({
				id: prod.id,
				name: prod.name,
				description: prod.description,
				price: prod.curr_price_vat,
				quantity: prod.quant,
				category: prod.id_category
			});
		});
	};

	onMount(async () => {
		await categoriesLoad();
		await updateProducts();
	});
</script>

<div class="container">
	<div class="buttons">
		<Button mode="success" onclick={createNewProduct}>New Product</Button>
	</div>
	<DataGrid {fields} {data} {actions} />
</div>

{#if editProductModal}
	<Modal
		title="Product"
		onclose={() => (editProductModal = false)}
		oncancel={() => (editProductModal = false)}
	>
		<ProductEdit product={currProduct!} {onsave} />
	</Modal>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		justify-content: center;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.3rem;
	}
</style>
