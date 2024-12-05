import { PropertyCard } from "./PropertyCard";

export const PropertyList = ({ propertyList, onEdit, onViewDetails, onDelete }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '6px',
    }}
  >
    {Array.isArray(propertyList) && propertyList.length > 0 ? (
      propertyList.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          onEdit={() => onEdit(property._id)}
          onViewDetails={() => onViewDetails(property._id)}
          onDelete={() => onDelete(property._id)}
        />
      ))
    ) : null}
  </div>
);
