const cURL = `\`\`\`bash
# cURL request to chatbot API endpoint.
curl -X POST https://dolphin-app-tmpol.ondigitalocean.app/api/v1/chatbot/{{id}}
   -H "Content-Type: application/json"
   -H "Authorization: Bearer {token}"
   -d '{"message": "Hello!"}'
\`\`\``;

const javascript = `\`\`\`jsx
# Javascript request to chatbot API endpoint.
const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json'
        'Authorization': 'Bearer {token}'
    },
    body: JSON.stringify({ message: 'Hello!' })
};

const response = await fetch(
    'https://dolphin-app-tmpol.ondigitalocean.app/api/v1/chatbot/{{id}}', 
    requestOptions
);
const data = await response.json();
\`\`\``;

const python = `\`\`\`python
# Python request to chatbot API endpoint using the requests library.
import requests

url = 'https://dolphin-app-tmpol.ondigitalocean.app/api/v1/chatbot/{{id}}'
headers = {'Authorization': 'Bearer {token}'}
payload = {'messsage': 'Hello!'}

response = requests.post(url, data = payload, headers = headers)

print(response.text)
\`\`\``;

const php = `\`\`\`php
# PHP request to chatbot API endpoint.
<?php
$url = "https://dolphin-app-tmpol.ondigitalocean.app/api/v1/chatbot/{{id}}";
$data = array(
    "messate" => "Hello!"
);

$headers = array(
    "Content-Type: application/json",
    "Authorization: Bearer {TOKEN}"
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
\`\`\``;

export const API_DOCS = [
  {
    id: "curl",
    label: "cURL",
    code: cURL,
  },
  {
    id: "javascript",
    label: "Javascript",
    code: javascript,
  },
  {
    id: "python",
    label: "Python",
    code: python,
  },
  {
    id: "php",
    label: "PHP",
    code: php,
  },
];
