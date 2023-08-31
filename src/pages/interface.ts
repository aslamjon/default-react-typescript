export interface clients {
	birthDay: string;
	createdAt: string;
	createdById: string;
	firstName: string;
	gender: string;
	lastName: string;
	livingAddress: string;
	passportNumber: string;
	updatedAt: string;
	_id: string;
}

export interface templates {
	createdAt: string;
	createdById: string;
	months: number;
	name: string;
	precent: number;
	_id: string;
}

export interface warehouses {
	branchId: string;
	count: number;
	createdAt: string;
	createdById: string;
	currentCount: number;
	date: string;
	description: string;
	name: string;
	price: number;
	_id: string;
}
