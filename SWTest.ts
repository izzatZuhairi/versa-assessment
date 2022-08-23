import * as fs from "fs"

const getSWPeople = async (url: string, results: any[]) => {
    const res: any = await fetch(url, { "method": "GET" })
        .then(v => {
            return v.json()
        })
        .then(async reslt => {
            if (reslt.next) {
                await getSWPeople(reslt.next, results)
            }

            return reslt.results;
        })

    results.push(res)
    return results;
}

const restructureArr = (arr, gender: string) => {
    return arr?.filter(v => v?.gender === gender).map(el => { return { name: el.name, height: el.height } }).sort((a, b) => parseFloat(a.height) - parseFloat(b.height))
}

const main = async () => {
    let curr: any = []
    let data: any = await getSWPeople("https://swapi.dev/api/people/", curr);

    let final: any = {
        female: [],
        male: [],
    };

    let flatArr = data.flatMap(v => v)

    final.female = restructureArr(flatArr, "female")
    final.male = restructureArr(flatArr, "male")

    let finalData = Object.keys(final).map(v => {
        return {
            gender: v,
            characters: final[v]
        }
    })

    fs.writeFile("output.json", JSON.stringify(finalData), () => { })
}

main();