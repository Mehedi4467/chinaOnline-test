export const demoProduct = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
  {
    id: 13,
  },
  {
    id: 14,
  },
  {
    id: 15,
  },
  {
    id: 16,
  },
  {
    id: 17,
  },
  {
    id: 18,
  },
  {
    id: 19,
  },
  {
    id: 20,
  },
];
export const dropDown = [
  {
    id: 0,
    name: 'Price Low To High',
    link: 'sort_status=Price&direction=Asc',
  },
  {
    id: 1,
    name: 'Price High To Low',
    link: 'sort_status=Price&direction=Desc',
  },
  { id: 2, name: 'Offer', link: 'discount_status=true' },
  { id: 3, name: 'Seller Rating', link: 'sort_status=VendorRating' },
  { id: 4, name: 'Most Sold', link: 'sort_status=Volume' },
];
export const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const districtName = [
  'Dhaka',
  'Faridpur',
  'Gazipur',
  'Gopalganj',
  'Jamalpur',
  'Kishoreganj',
  'Madaripur',
  'Manikganj',
  'Munshiganj',
  'Mymensingh',
  'Narayanganj',
  'Narsingdi',
  'Netrokona',
  'Rajbari',
  'Shariatpur',
  'Sherpur',
  'Tangail',
  'Bogra',
  'Joypurhat',
  'Naogaon',
  'Natore',
  'Nawabganj',
  'Pabna',
  'Rajshahi',
  'Sirajgonj',
  'Dinajpur',
  'Gaibandha',
  'Kurigram',
  'Lalmonirhat',
  'Nilphamari',
  'Panchagarh',
  'Rangpur',
  'Thakurgaon',
  'Barguna',
  'Barisal',
  'Bhola',
  'Jhalokati',
  'Patuakhali',
  'Pirojpur',
  'Bandarban',
  'Brahmanbaria',
  'Chandpur',
  'Chittagong',
  'Comilla',
  `Cox's Bazar`,
  'Feni',
  'Khagrachari',
  'Lakshmipur',
  'Noakhali',
  'Rangamati',
  'Habiganj',
  'Maulvibazar',
  'Sunamganj',
  'Sylhet',
  'Bagerhat',
  'Chuadanga',
  'Jessore',
  'Jhenaidah',
  'Khulna',
  'Kushtia',
  'Magura',
  'Meherpur',
  'Narail',
  'Satkhira',
];
export const methodName = [
  'Office Collection',
  'Sundarban',
  'SA Paribahan',
  'Steadfast',
  // 'RedX',
  // 'eCourier',
  // 'Others Online Courier',
];
export const charges = [
  // Dont change index sequence
  {
    id: 1,
    from: 'China',
    method: 'air',
    time: '12-24',
  },
  {
    id: 2,
    from: 'China',
    method: 'sea',
    time: '45-60',
  },
];
export const getCharges = (method) => {
  return charges.filter((el) => el.method === method);
};

export const specification = [
  { PropertyName: 'Color', Value: 'K26 male black' },
  { PropertyName: 'Color', Value: 'K26 male gray' },
  { PropertyName: 'Color', Value: 'K26 female black' },
  { PropertyName: 'Color', Value: 'K26 female jujube' },
  { PropertyName: 'Color', Value: 'K26 female purple' },
  { PropertyName: 'Size', Value: '36' },
  { PropertyName: 'Size', Value: '37' },
  { PropertyName: 'Size', Value: '38' },
  { PropertyName: 'Size', Value: '39' },
  { PropertyName: 'Size', Value: '40' },
  { PropertyName: 'Size', Value: '41' },
  { PropertyName: 'Size', Value: '42' },
  { PropertyName: 'Size', Value: '43' },
  { PropertyName: 'Size', Value: '44' },
  { PropertyName: 'Product Category', Value: 'Tooling' },
  { PropertyName: 'Opening depth', Value: 'Middle' },
  { PropertyName: 'Applicable age', Value: 'Youth18' },
  { PropertyName: 'Appropriate season', Value: 'Summer' },
  { PropertyName: 'Appropriate season', Value: 'Spring' },
  { PropertyName: 'Appropriate season', Value: 'Autumn' },
  { PropertyName: 'Popular elements', Value: 'Hollow' },
  { PropertyName: 'Origin', Value: 'Henan Jiao Wen Cou' },
  { PropertyName: 'Style', Value: 'Leisure' },
  { PropertyName: 'Applicable gender', Value: 'Male' },
  { PropertyName: 'Pattern', Value: 'Offset printing' },
  { PropertyName: 'Upper material', Value: 'Cotton' },
];
