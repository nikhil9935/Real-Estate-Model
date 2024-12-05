import { EditOutlined, EyeOutlined, DeleteOutlined } from './AntdComponents';
import { Card } from './AntdComponents';
import ButtonAtom from './Buttons';

export const PropertyCard = ({ property, onEdit, onViewDetails, onDelete }) => (
  <Card
    key={property._id}
    style={{ width: '500px', margin: '5px 0' }}
    actions={[
      <ButtonAtom key={property._id} icon={<EditOutlined />} onClick={onEdit}>
        Edit
      </ButtonAtom>,
      <ButtonAtom key={property._id} icon={<EyeOutlined />} onClick={onViewDetails}>
        View
      </ButtonAtom>,
      <ButtonAtom key={property._id} icon={<DeleteOutlined />} onClick={onDelete}>
        Delete
      </ButtonAtom>,
    ]}
  >
    <h2>{property.title}</h2>
    <p>{property.description}</p>
    <p>Price: ${property.price}</p>
    <p>Address: {property.address}</p>
  </Card>
);