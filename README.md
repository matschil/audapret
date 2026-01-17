# What is AUDAPRET? 

AUDAPRET, short for AUtomatic DAta Processing in REsearch Trials, is a software project I have built as part of my Bachelors Thesis at the Technical University of Munich (TUM) in 2019. 
The system enables automatic data collection from multiple cloud-based data-sources such as Oura-Rings, Fitbit-Bracelets and form-based surveys to conduct research studies among multiple participants.

The PDF of my full Thesis can be downloaded here: https://drive.google.com/file/d/1Gg0W5Gd0s2-vQv-71tcJ1SdHwfp8LKZr/view?usp=sharing

This research also led to a publication in the Proceedings of the International Conference on E-Health (MCCSIS) and can be downloaded here: https://www.iadisportal.org/digital-library/audapret-towards-a-cloud-architecture-supporting-multi-device-research-studies

# USAGE OF AUDAPRET PROTOTYPE

### Setup with Docker

1. Install docker from docker.io
2. Install docker compose
3. Navigate to /ba-felix-matschilles/01 Source Code/audapret
4. Make sure that Port 5432 is not in use (Default Port of PostgreSQL Server)
5. Run `docker-compose up` (initial image build can take a while. ~20 min on my machine)
6. Access the Study-Data-Manager Client on http://localhost:4203
7. Access the Study-Administrator Client on http://localhost:4202

### Manual Setup

1. Install TypeScript
2. Install NodeJs
3. Install npm
4. Navigate to /ba-felix-matschilles/01 Source Code/audapret
5. Run `npm install`
6. Start PostgreSQL server on localhost:5432
7. Create Databases called `limesurvey_adapter`, `netatmo_adapter`, `oura_adapter`, `study_administrator`, `study_data_manager` with username `postgres` and password `postgres`
8. Run `nx serve study-data-manager`
9. Run `nx serve limesurvey-adapter`
10. Run `nx serve netatmo-adapter`
11. Run `nx serve oura-adapter`
12. Open http://localhost:3334/api/oura in your browser
13. Login to Oura Cloud. Email: `xxx`, password: `xxx`
14. Run `nx serve study-administrator`
15. Run `nx serve study-data-manager-client`
16. Run `nx serve study-administrator-client --port 4201`
17. Access the Study-Data-Manager Client on http://localhost:4200
18. Access the Study-Administrator Client on http://localhost:4201

IMPORTANT: In case you chose the manual setup path, the StudyDataManager cannot be addressed via http://study-data-manager:3333, only via http://localhost:3333

### Interactive documentation

Assuming all tools are installed according to the manual setup

1. Run `npx compodoc -p tsconfig.json -s` to generate an interactive code documentation!
2. Access the documentation on http://127.0.0.1:8080
