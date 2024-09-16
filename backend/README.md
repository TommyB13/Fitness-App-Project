## Connecting to AWS MongoDB

- Make sure AWS server is running (will be set up through GitHub Action so server is not running 24/7)
  
  - Connect to server with pemkey (these steps may also be included in GitHub Action)
    
    - Development: `ssh -i '.\Downloads\Software Dev II.pem' ubuntu@18.219.62.187`
    
    - Production: `ssh -i '.\Downloads\Software Dev II.pem' ubuntu@3.131.97.249`
  
  - Start mongod
    
    `sudo systemctl start mongod`

- On your computer connect to the AWS server and route it to port 8000
  
  - Development: `ssh -i '.\Downloads\Software Dev II.pem' -N -f -L 8000:localhost:27017 ubuntu@18.219.62.187`
  
  - Production: `ssh -i '.\Downloads\Software Dev II.pem' -N -f -L 8001:localhost:27017 ubuntu@3.131.97.249`

- Open connection in MongoDB compass with connection string:
  
  - Development: `mongodb://localhost:8000/`
  
  - Production: `mongodb://localhost:8001/`
