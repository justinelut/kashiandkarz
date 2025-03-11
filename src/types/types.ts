export interface CarMake {
	name: string;
	slug: string;
	image: string;
}

export interface CarType {
  name: string;
  slug: string;
  car_info: CarInfo[];
}


export interface PhotoVideo {
	images?: string[];
	video?: string;
}


export interface ReviewSubmit {
	status: "published" | "draft";
	availability: boolean;
	slug: string;
}


export interface UpdateStatus {
	status: "published" | "draft";
	availability: boolean;
	slug: string;
	featured: string;
}


export interface CarColors{
  name: string;
  hex: string;
}



export interface CarInfo {
	car_make: string;
	car_model: string;
	year: string;
	vehicle_type: string;
	condition: string;
	description: string;
	slug: string;
	title: string;
	color: string;
	big_deal: boolean;
	images: string[];
	video: string;
	status: "published" | "draft";
	availability: boolean;
  car_features: string;
  car_specifications: string;
  car_type: string;
  ownership_documentation: string;
  pricing_payments: string;
}


export interface CarSpecifications {
	fuel_type: string;
	transmission_type: string;
	drive_train: string;
	engine_capacity: string;
	horse_power: string;
	torque: string;
	mileage: string;
	mileage_unit: string;
	doors: number;
	seats: number;
	engine_power: string;
	top_speed: string;
	acceleration: string;
	co2_emissions: string;
	range: string;
	laptime: string;
	fuel_economy: string;
	load_volume: string;
	payload: string;
	battery: string;
	charging: string;
	family_score: number;
	boot_space: string;
	safety_rating: number;
}

export interface CarFeaturesOptions {
  interior_features: string[];
  engine: string[];
  wheels: string[];
  exterior_features: string[];
  safety_features: string[];
  entertainment_features: string[];
  convenience_features: string[];
  security_features: string[];
  sports_car_features: string[];
  family_car_features: string[];
  ecofriendly_features: string[];
  commercial_car_features: string[];
}

export interface OwnershipDocumentation {
	vin: string;
	registration_number: string;
	logbook_availability: "yes" | "no";
	previous_owners: number;
	insurance_status: "valid" | "expired" | "none";
}


export interface PricingPayment {
	selling_price: string;
	negotiable: "yes" | "no";
	installment_plans: "yes" | "no";
	payment_methods: string[];
	currency: string;
	insurance_group: string;
	road_tax: string;
	warranty: string;
}


