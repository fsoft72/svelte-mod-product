<script lang="ts">
	import FormCreator, { type FormField } from '$liwe3/components/FormCreator.svelte';
	import { toFixed } from '$liwe3/utils/utils';
	import type { Product } from '../types';

	interface ProductEditProps {
		product: Product;

		// events
		onsave: (product: Product) => void;
	}

	let { product, onsave }: ProductEditProps = $props();

	const _calc_values = async (
		name: string,
		value: any,
		row: Record<string, any>
	): Promise<boolean> => {
		console.log('=== CALC: ', { name, value, row });

		switch (name) {
			case 'price_net':
				product.price_vat = toFixed(value * (1 + (product.vat ?? 0) / 100));
				break;

			case 'price_vat':
				product.price_net = toFixed(value / (1 + (product.vat ?? 0) / 100));
				break;

			case 'vat':
				product.price_vat = toFixed((product.price_net ?? 0) * (1 + (value ?? 0) / 100));
				product.curr_price_vat = toFixed((product.curr_price_net ?? 0) * (1 + (value ?? 0) / 100));
				break;

			case 'curr_price_vat':
				product.curr_price_net = toFixed(value / (1 + (product.vat ?? 0) / 100));
				break;

			case 'curr_price_net':
				product.curr_price_vat = toFixed(value * (1 + (product.vat ?? 0) / 100));
				break;
		}

		return true;
	};

	const fields: FormField[] = [
		{ name: 'code', label: 'Code', type: 'text', col: 4 },
		{ name: 'code_forn', label: 'Code Forn', type: 'text', col: 4 },
		{ name: 'sku', label: 'SKU', type: 'text', col: 4 },
		{ name: 'name', label: 'Name', type: 'text', col: 4 },
		{ name: 'short_description', label: 'Short Description', type: 'text', col: 4 },
		{ name: 'url', label: 'URL', type: 'text', col: 4 },
		{ name: 'description', label: 'Description', type: 'markdown' },

		{ name: 'cost', label: 'Cost', type: 'number', col: 2, onchange: _calc_values },
		{ name: 'vat', label: 'VAT', type: 'number', col: 2, onchange: _calc_values },
		{ name: 'price_net', label: 'Price NET', type: 'number', col: 2, onchange: _calc_values },
		{ name: 'price_vat', label: 'Price VAT', type: 'number', col: 2, onchange: _calc_values },
		{
			name: 'curr_price_net',
			label: 'Curr Price NET',
			type: 'number',
			col: 2,
			onchange: _calc_values
		},
		{
			name: 'curr_price_vat',
			label: 'Curr Price VAT',
			type: 'number',
			col: 2,
			onchange: _calc_values
		},

		{ name: 'free', label: 'Free', type: 'checkbox', col: 1 },
		{ name: 'visible', label: 'Visible', type: 'checkbox', col: 1 },
		{ name: 'relevance', label: 'Relevance', type: 'number', col: 1 },
		{ name: 'level', label: 'Level', type: 'number', col: 1 },
		{ name: 'quant', label: 'Quantity', type: 'number', col: 1 },
		{ name: 'ordered', label: 'Back ordered', type: 'number', col: 1 },
		{ name: 'available', label: 'Available', type: 'date', col: 2 },
		{ name: 'single', label: 'Single', type: 'checkbox', col: 4 },

		{ name: 'weight', label: 'Weight (gr)', type: 'number', col: 1 },
		{ name: 'width', label: 'Width (mm)', type: 'number', col: 1 },
		{ name: 'height', label: 'Height (mm)', type: 'number', col: 1 },
		{ name: 'depth', label: 'Depth (mm)', type: 'number', col: 1 },
		{ name: 'tags', label: 'Tags', type: 'tags', col: 4 },
		{ name: 'image', label: 'Image', type: 'media', col: 4 },
		{ name: 'id_category', label: 'Category', type: 'category', col: 4 }
	];

	const onsubmit = (data: any) => {
		onsave(data);
	};
</script>

<div class="container">
	<FormCreator {fields} {onsubmit} bind:values={product as Product} />
</div>

<style>
</style>
