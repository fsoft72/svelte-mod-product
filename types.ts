// This file is autogenerated by liwe3-svelte
/* eslint-disable @typescript-eslint/no-explicit-any */

/*=== f2c_start __file ===*/

/*=== f2c_end __file ===*/

/** Product */
export interface Product {
	/** the main id field */
	id: string;
	/** The domain name */
	domain?: string;
	/** User ID that created the product */
	id_owner?: string;
	/** The user id of the product manufacturer */
	id_maker?: string;
	/** Product Category ID */
	id_category?: string;
	/** ID of availability [default: 0] */
	id_availability?: number;
	/** Product unique code */
	code?: string;
	/** Product unique code assigned by the provider */
	code_forn?: string;
	/** Product SKU */
	sku?: string;
	/** A JSON string for more informations */
	extra?: any;
	/** Product name */
	name?: string;
	/** Product description */
	description?: string;
	/** Product short description */
	short_description?: string;
	/** Product original URL */
	url?: string;
	/** Cost for buying it */
	cost?: number;
	/** The price, VAT free */
	price_net?: number;
	/** The price with VAT */
	price_vat?: number;
	/** The current price, VAT free */
	curr_price_net?: number;
	/** The current price with VAT */
	curr_price_vat?: number;
	/** VAT applied */
	vat?: number;
	/** Flag T/F if the product is free [default: false] */
	free?: boolean;
	/** Percentage discount */
	discount?: number;
	/** Quantity available in the warehouse [default: 0] */
	quant?: number;
	/** Quantity in back order [default: 0] */
	ordered?: number;
	/** Product availability date */
	available?: Date;
	/** User level required to see the product [default: 0] */
	level?: number;
	/** Flag T/F if the product is visible [default: true] */
	visible?: boolean;
	/** Product status [default: 0] */
	status?: number;
	/** Image ID */
	image?: string;
	/** Image URL */
	image_url?: string;
	/** Importance of the product in search results (the more, the better) [default: 0] */
	relevance?: number;
	/** Product weight (in grams) [default: 0] */
	weight?: number;
	/** Width of the product in millimiters [default: 0] */
	width?: number;
	/** Height of the product in millimiters [default: 0] */
	height?: number;
	/** Depth of the product in millimiters [default: 0] */
	depth?: number;
	/** tags for the type */
	tags?: string[];
	/** If T, only one item can be bought */
	single?: boolean;
}

