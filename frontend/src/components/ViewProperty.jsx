import { Descriptions, Image } from './AntdComponents';

export const PropertyImage = ({ src }) => (
    <Image src={src} alt="Property" style={{ width: '100%', height: '50vh', objectFit: 'cover' }} />
);

export const PropertyInfo = ({ details }) => (
    <Descriptions title="Property Info" bordered>
        <Descriptions.Item label="Title">{details.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{details.description}</Descriptions.Item>
        <Descriptions.Item label="Address">{details.address}</Descriptions.Item>
        <Descriptions.Item label="Price">${details.price}</Descriptions.Item>
        <Descriptions.Item label="Created BY">{details.createdBy}</Descriptions.Item>
        <Descriptions.Item label="Updated By">{details.updatedBy}</Descriptions.Item>
    </Descriptions>
);

export const PropertyDetails = ({ details }) => (
    <Descriptions title="Property Details" bordered style={{ marginTop: '20px' }}>
        <Descriptions.Item label="Bedrooms">{details.bedrooms}</Descriptions.Item>
        <Descriptions.Item label="Bathrooms">{details.bathrooms}</Descriptions.Item>
        <Descriptions.Item label="Area Square Feet">{details.areaSquareFeet}</Descriptions.Item>
        <Descriptions.Item label="Is Furnished">{details.isFurnished ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Has Garage">{details.hasGarage ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Is Pets Allowed">{details.isPetsAllowed ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Has Swimming Pool">{details.hasSwimmingPool ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Is Security Enabled">{details.isSecurityEnabled ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Is Gated Community">{details.isGatedCommunity ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Has Garden">{details.hasGarden ? 'Yes' : 'No'}</Descriptions.Item>
        <Descriptions.Item label="Construction Year">{details.constructionYear}</Descriptions.Item>
        <Descriptions.Item label="Energy Efficiency Rating">{details.energyEfficiencyRating}</Descriptions.Item>
        <Descriptions.Item label="Agent Name">{details.agentName}</Descriptions.Item>
        <Descriptions.Item label="Agent Email">{details.contactEmail}</Descriptions.Item>
        <Descriptions.Item label="Agent Contact Phone">{details.contactPhone}</Descriptions.Item>
    </Descriptions>
);


