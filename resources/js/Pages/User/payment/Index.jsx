import React from 'react';
const CustomerDetails = ({ customerDetails }) => {
    return (
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Name:</div>
                        <div className="col-span-2">{customerDetails.first_name}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Email:</div>
                        <div className="col-span-2">{customerDetails.email}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="font-medium">Phone:</div>
                        <div className="col-span-2">{customerDetails.phone || 'Not provided'}</div>
                    </div>
                </div>
    );
};

export default CustomerDetails;
