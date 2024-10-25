const fs = require("node:fs")
const readline = require('node:readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        });
        rl.close();
    });
};

// To Do : lanjutkan pembuatan logic disini 
//make-file
app.makeFile = () => {
    rl.question("Masukan Nama Folder : ",(folder) => {
        rl.question("Masukan Nama File : ",(file) => {
            rl.question("Masukan extension : ",(ext) => {
                const path = `${folder}/${file}.${ext}`; 
                fs.writeFileSync(path, ""); 
                console.log(`File created at ${path}`);
                rl.close();
            });
        });
    });
};

//ext-sorter
app.extSorter = () => {
    const res = fs.readdirSync('unorganize_folder');


for (let index = 0; index < res.length; index++) {
    const element = res[index];
    const ext = element.split(".") [element.split(".").length - 1];
    console.log(ext);
    if(["txt", "pdf", "md"].includes(ext)) {
        fs.mkdir(__dirname + `/text`,() => {
            fs.rename(
                __dirname + `/unorganize_folder` + "/" + element,
                __dirname + `/text` + "/" + element, 
                (err) => {}
            );
        });
    } 
}
rl.close();

return;

};


//read-folder
app.readFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        //list of file
        const res = fs.readdirSync(folderName);
        const output = [];
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            try {
            const stat = fs.statSync(__dirname + `/${folderName}` + "/" + element);

            output.push({
                namaFile : element,
                extensi : element.split('.')[1],
                jenisFile : "",
                tanggalDibuat : stat.birthtime,
                ukuranFile : stat.size.toString(),
            })
            } catch (error) {
                console.log('gagal baca file', folderName, element);
            }
        }
        console.log(output);
        rl.close();
    });
    
};

//read-file
app.readFile = () => {
    rl.question("Masukan Nama Folder : ", (folderName) => {
        rl.question("Masukan Nama File : ", (fileName) => {
            const filePath = `${folderName}/${fileName}`;
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(`Gagal membaca file: ${filePath}. Error: ${err.message}`);
                } else {
                    console.log(`Isi file ${filePath}:\n${data}`);
                }
                rl.close();
            });
        });
    });
};







module.exports = app