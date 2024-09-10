<script lang="ts">
	import DataGrid, {
		type DataGridAction,
		type DataGridField,
		type DataGridRow
	} from '$liwe3/components/DataGrid.svelte';

	import { PencilSquare, Trash } from 'svelte-hero-icons';
	import {
		product_admin_add,
		product_admin_del,
		product_admin_details,
		product_admin_fields,
		product_admin_list
	} from '../actions';
	import { onMount } from 'svelte';
	import type { Product } from '../types';
	import Button from '$liwe3/components/Button.svelte';
	import Modal from '$liwe3/components/Modal.svelte';
	import ProductEdit from './ProductEdit.svelte';
	import { storeCategory } from '$modules/category/store.svelte';
	import { addToast } from '$liwe3/stores/ToastStore.svelte';

	const fields: DataGridField[] = [
		{ name: 'id', label: 'ID', type: 'string', hidden: true },
		{ name: 'code', label: 'Code', type: 'string', filterable: true, sortable: true },
		{ name: 'name', label: 'Name', type: 'string', filterable: true, sortable: true },
		{ name: 'short_description', label: 'Description', type: 'string' },
		{ name: 'curr_price_vat', label: 'Price', type: 'number', align: 'right' },
		{ name: 'quant', label: 'Quantity', type: 'number', align: 'right' },
		{
			name: 'category',
			label: 'Category',
			type: 'string',
			render: (value: string, row: DataGridRow) => {
				return storeCategory.get(value)?.title ?? '';
			}
		}
	];

	const actions: DataGridAction[] = [
		{
			id: 'edit',
			label: 'Edit',
			icon: PencilSquare,
			onclick: (row: DataGridRow) => {
				editProduct(row);
			}
		},
		{
			id: 'delete',
			label: 'Delete',
			icon: Trash,
			mode: 'danger',
			onclick: async (row: DataGridRow) => {
				currProduct = row as Product;
				deleteProductModal = true;
			}
		}
	];

	let data: DataGridRow[] = $state([]);
	let editProductModal = $state(false);
	let deleteProductModal = $state(false);
	let currProduct: Product | null = $state(null);

	const createNewProduct = () => {
		currProduct = {
			id: ''
		};

		editProductModal = true;
	};

	const editProduct = async (row: DataGridRow) => {
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

		if (res.error) {
			addToast({
				type: 'error',
				title: 'Error',
				message: res.error.message
			});

			return;
		}

		await updateProducts();
		editProductModal = false;
	};

	const updateProducts = async () => {
		const prods: Product[] | any = await product_admin_list();

		if (prods.error) return;

		if (!prods) return;

		data = prods;
	};

	const deleteProduct = async () => {
		if (!currProduct) return;

		const res = await product_admin_del(currProduct.id);

		if (res.error) {
			addToast({
				type: 'error',
				title: 'Error',
				message: res.error.message
			});

			return;
		}

		await updateProducts();
		deleteProductModal = false;
	};

	onMount(async () => {
		await storeCategory.load();
		await updateProducts();
	});
</script>

<div class="container">
	<div class="buttons">
		<Button mode="success" onclick={createNewProduct}>New Product</Button>
	</div>
	{#key data}
		<DataGrid title="Products list" {fields} {data} {actions} />
	{/key}
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

{#if deleteProductModal}
	<Modal
		title="Product"
		onclose={() => (deleteProductModal = false)}
		oncancel={() => (deleteProductModal = false)}
	>
		<div>
			<p>Are you sure you want to delete this product?</p>
			<p>{currProduct?.name}</p>
			<div class="buttons">
				<Button mode="danger" onclick={deleteProduct}>Delete</Button>
			</div>
		</div>
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
