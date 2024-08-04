# Antika server
Antika server is a simple server that can be used to watch video from a URL and another specific parameter. This server was created to be used with the Antika extension.

## Installation
To install the server, you need to have [Node.js](https://nodejs.org/en/) installed on your computer. After that, you can clone the repository and install the dependencies using the following commands:
```bash
git clone https://github.com/oriionn/antika-server.git
cd antika-server
npm install
```

## Usage
Before starting the server, you need to create a `.env` file in the root directory of the project. The `.env` file should contain the following variables:
```
PORT=3000
```
You can change the value of the `PORT` variable to any port you want.

After that, you can start the server using the following command:
```bash
npm start
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
