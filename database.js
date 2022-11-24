const fs = require('fs/promises');
const path = require('path');

const exists = async path => !!(await fs.stat(path).catch(e => false));

const ensure = type => async id => {
    const dir = `./database/${type}s/${id}.json`;
    if (!await exists(dir)) {
        await fs.writeFile(dir, '{}');
        return true;
    }
    return false;
}

const get = type => async id => {
    if (await ensure(type)(id)) return {};
    const dir = `./database/${type}s/${id}.json`;
    let content = await fs.readFile(dir, { encoding: 'utf8' })
    return JSON.parse(content);
}

exports.get_user = get('user');
exports.get_guild = get('guild');