document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const results = document.getElementById('results');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            amenities: {},
            location: {},
            reviews: {}
        };

        // Location details
        formData.location.university = form.querySelector('[name="university"]').value;
        formData.location.distance_to_uni = parseFloat(form.querySelector('[name="distance_to_uni"]').value);
        formData.location.distance_to_transport = parseFloat(form.querySelector('[name="distance_to_transport"]').value);
        formData.location.is_main_road = false; // Default value since checkbox removed
        formData.location.is_residential_area = false; // Default value since checkbox removed
        formData.location.safety_score = parseInt(form.querySelector('[name="safety_score"]').value);

        // Amenities
        const amenityFields = ['has_wifi', 'has_attached_bathroom', 'has_ac', 'has_kitchen', 
                             'has_laundry', 'has_parking', 'meals_provided', 'has_study_table', 'has_cupboard'];
        amenityFields.forEach(field => {
            formData.amenities[field] = form.querySelector(`[name="${field}"]`).checked;
        });

        // Reviews
        formData.reviews.overall_rating = parseFloat(form.querySelector('[name="overall_rating"]').value);
        formData.reviews.num_reviews = parseInt(form.querySelector('[name="num_reviews"]').value);
        formData.reviews.landlord_response_time = parseFloat(form.querySelector('[name="landlord_response_time"]').value);
        formData.reviews.value_rating = parseFloat(form.querySelector('[name="value_rating"]').value);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get prediction');
            }

            const data = await response.json();
            
            // Clear any existing alerts
            const priceContainer = document.querySelector('.price-predictions');
            const existingAlerts = priceContainer.querySelectorAll('.alert');
            existingAlerts.forEach(alert => alert.remove());

            // Update location category info
            const locationInfo = document.createElement('div');
            locationInfo.className = 'alert alert-info mb-3';
            locationInfo.innerHTML = `
                <h6 class="mb-1">${data.location_info.category}</h6>
                <small>${data.location_info.description}</small>
            `;
            priceContainer.insertBefore(locationInfo, priceContainer.querySelector('.row'));

            // Update room type info
            const roomInfo = document.createElement('div');
            roomInfo.className = 'alert alert-info mb-3';
            roomInfo.innerHTML = `
                <h6 class="mb-1">${data.room_info.description}</h6>
                <small>Price shown per person. Total room price shown in parentheses.</small>
            `;
            priceContainer.insertBefore(roomInfo, priceContainer.querySelector('.row'));

            // Show recommended price range
            if (data.recommended_range) {
                let rangeAlert = document.createElement('div');
                rangeAlert.className = 'alert alert-warning mb-3';
                rangeAlert.innerHTML = `<strong>Recommended Price Range:</strong> Rs. ${data.recommended_range.min.toLocaleString()} - Rs. ${data.recommended_range.max.toLocaleString()} <small class="text-muted">(Based on distance and amenities)</small>`;
                priceContainer.insertBefore(rangeAlert, priceContainer.firstChild);
            }

            // Update price predictions
            document.getElementById('lastMonthLabel').textContent = data.predicted_prices.last_month.month;
            document.getElementById('lastMonthPrice').innerHTML = 
                `Rs. ${data.predicted_prices.last_month.price}<br>
                <small class="text-muted">(Total: Rs. ${data.predicted_prices.last_month.total_room_price})</small>`;
            document.getElementById('lastMonthReason').textContent = data.predicted_prices.last_month.reason;
            
            document.getElementById('currentMonthLabel').textContent = data.predicted_prices.current.month;
            document.getElementById('currentPrice').innerHTML = 
                `Rs. ${data.predicted_prices.current.price}<br>
                <small class="text-muted">(Total: Rs. ${data.predicted_prices.current.total_room_price})</small>`;
            document.getElementById('currentMonthReason').textContent = data.predicted_prices.current.reason;
            document.getElementById('currentMonthChange').textContent = 
                `${data.predicted_prices.current.change_from_last >= 0 ? '↑' : '↓'} ${Math.abs(data.predicted_prices.current.change_from_last)}% from last month`;
            
            document.getElementById('nextMonthLabel').textContent = data.predicted_prices.next_month.month;
            document.getElementById('nextMonthPrice').innerHTML = 
                `Rs. ${data.predicted_prices.next_month.price}<br>
                <small class="text-muted">(Total: Rs. ${data.predicted_prices.next_month.total_room_price})</small>`;
            document.getElementById('nextMonthReason').textContent = data.predicted_prices.next_month.reason;
            document.getElementById('nextMonthChange').textContent = 
                `${data.predicted_prices.next_month.change_from_current >= 0 ? '↑' : '↓'} ${Math.abs(data.predicted_prices.next_month.change_from_current)}% from current month`;
            
            document.getElementById('nextYearPrice').innerHTML = 
                `Rs. ${data.predicted_prices.next_year_estimate}<br>
                <small class="text-muted">(Total: Rs. ${data.predicted_prices.next_year_total})</small>`;

            // Update scores
            document.getElementById('amenityScore').textContent = `${data.amenity_score}/10`;
            document.getElementById('locationScore').textContent = `${data.location_score}/10`;
            document.getElementById('reviewScore').textContent = `${data.review_score}/10`;

            // Update amenities list
            const amenitiesList = document.getElementById('amenitiesList');
            amenitiesList.innerHTML = Array.isArray(data.amenities_list) 
                ? data.amenities_list.map(amenity => `<span class="badge bg-primary amenity-badge">${amenity}</span>`).join(' ')
                : '';

            // Show results
            results.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    });
});
