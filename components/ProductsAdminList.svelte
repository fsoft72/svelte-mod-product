<script lang="ts">
	import DataGrid, {
		type GridAction,
		type GridDataRow,
		type GridField
	} from '$liwe3/components/DataGrid.svelte';
	import { PencilSquare, Trash } from 'svelte-hero-icons';
	import { product_admin_list } from '../actions';
	import { onMount } from 'svelte';
	import type { Product } from '../types';

	const fields: GridField[] = [
		{ name: 'id', label: 'ID', type: 'string', hidden: true },
		{ name: 'name', label: 'Name', type: 'string', filterable: true },
		{ name: 'description', label: 'Description', type: 'string' },
		{ name: 'price', label: 'Price', type: 'number' },
		{ name: 'quantity', label: 'Quantity', type: 'number' },
		{ name: 'category', label: 'Category', type: 'string' }
	];

	let data: GridDataRow[] = $state([]);

	let actions: GridAction[] = [
		{
			id: 'edit',
			label: 'Edit',
			icon: PencilSquare,
			action: (row: GridDataRow) => {
				console.log('Edit', row);
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

	onMount(async () => {
		const prods: Product[] | any = await product_admin_list();

		if (prods.error) return;

		if (!prods) return;

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
	});
</script>

<div class="container">
	<DataGrid {fields} {data} {actions} />
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
