import requests
import random
import concurrent.futures
from datetime import datetime, timedelta

# Define the URL and headers
url = 'http://<Backend Load Balancer URL>/appointments'

# Random lists of names
patient_names = [
    "Gregory House", "James Wilson", "Lisa Cuddy", "Eric Foreman", "Robert Chase", 
    "Allison Cameron", "Thirteen", "Chris Taub", "Martha Masters", "Stacy Warner",
    "Rachel Taub", "Dominika Petrova", "Edward Vogler", "Lucas Douglas", "Arlene Cuddy"
]

doctor_names = [
    "Dr. Gregory House", "Dr. James Wilson", "Dr. Lisa Cuddy", "Dr. Eric Foreman", "Dr. Robert Chase",
    "Dr. Allison Cameron", "Dr. Remy Hadley", "Dr. Chris Taub", "Dr. Martha Masters", "Dr. Sam Carr",
    "Dr. Jessica Adams", "Dr. Jeffrey Cole", "Dr. Travis Brennan", "Dr. Amber Volakis", "Dr. Lawrence Kutner"
]

def random_date():
    today = datetime.now()
    random_days = random.randint(1, 30)
    return (today + timedelta(days=random_days)).strftime("%Y-%m-%d")

def send_request():
    """Send a POST request with randomized data."""
    data = {
        "patientName": random.choice(patient_names),
        "doctorName": random.choice(doctor_names),
        "date": random_date()
    }
    try:
        response = requests.post(url, headers=headers, json=data, verify=False)
        print(f"Status Code: {response.status_code}, Response: {response.text}")
    except requests.RequestException as e:
        print(f"Request failed: {e}")

# Load testing with concurrency
def load_test(requests_per_second, duration_seconds):
    total_requests = requests_per_second * duration_seconds
    with concurrent.futures.ThreadPoolExecutor(max_workers=requests_per_second) as executor:
        futures = [executor.submit(send_request) for _ in range(total_requests)]
        concurrent.futures.wait(futures)

# Run load test
requests_per_second = 100  # Adjust this to control the load
duration_seconds = 360  # Duration of the load test in seconds
load_test(requests_per_second, duration_seconds)

