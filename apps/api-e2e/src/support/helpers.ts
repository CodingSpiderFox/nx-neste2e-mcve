/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { exec } from 'child_process';
import mongoose, { connect } from 'mongoose';
import net from 'net';
import { DEFAULT_DB_NAME } from '../../../api/src/app/app.module';

export const APP_PORT = 3333;
export const DB_EXPOSED_PORT = 28017;

const dbStartCommand = `docker compose up db`;
const dbStopCommand = `docker compose stop db`;
const appStartCommand = `docker compose up -d app`;

export function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  function waitForPortToOpen(port: number, timeoutMs: number) {
    const startTime = new Date().getTime();
  
    let isPortOpen = false;
    const setPortOpen = () => {
      isPortOpen = true;
    };
    while (isPortOpen) {
      net.connect({ port }).on('connect', setPortOpen);
      if (new Date().getTime() - startTime > timeoutMs) {
        console.error(`Port ${port} did not open after timeout of ${timeoutMs} milliseconds`);
        break;
      }
  
      if (isPortOpen) {
        break;
      }
    }
  }
  
  export async function startApp(): Promise<void> {
    exec(appStartCommand, (error, stdout, stderr) => {
      if (error || stderr || stdout) {
        // ignore
      }
    });
  
    waitForPortToOpen(APP_PORT, 20000);
  
    await sleep(20000);
  }
  
  export async function startDb(): Promise<void> {
    exec(dbStartCommand, (error, stdout, stderr) => {
      if (error || stderr || stdout) {
        // ignore
      }
    });
  
    waitForPortToOpen(DB_EXPOSED_PORT, 5000);
  
    await sleep(10000);
  }
  
  export async function stopDb(): Promise<void> {
    exec(dbStopCommand, (error, stdout, stderr) => {
      if (error || stderr || stdout) {
        // ignore
      }
    });
  }
  
  export async function resetDb(): Promise<void> {
    try {
      connect(`${process.env.MONGODB_URI}`, async () => {
        if (mongoose.connection.db) {
          await mongoose.connection.db.dropDatabase({ dbName: DEFAULT_DB_NAME });
        }
      });
    } catch {
      // ignore errors
    }
  
    await sleep(4000);
  }
  
  export async function startDbAndApp(): Promise<void> {
    await startDb();
    console.log('Started DB');
    await startApp();
    console.log('Started App');
  }