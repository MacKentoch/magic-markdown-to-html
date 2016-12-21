/* eslint arrow-body-style:0 */
/* eslint import/prefer-default-export:0 */
import sql from 'mssql';
import appConfig from '../config';

export function getUser(username:string = '') {
  return new Promise(
    (resolve, reject) => {
      if (username.length === 0) {
        return reject({ error: 'username is empty' });
      }

      sql
        .connect(appConfig.mssqlConfig)
        .then(
          () => {
            return new sql
                  .Request()
                  .input('username', sql.VarChar(255), username)
                  .query('select * from users where username = @username')
                  .then((recordset) => resolve(recordset))
                  .catch((err) => reject({ error: err }));
          }
        )
        .catch(
          err => reject({ error: err })
        );
    }
  );
}
