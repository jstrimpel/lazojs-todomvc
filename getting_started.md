# Getting Started
Lazo is a [node module](https://npmjs.org/). Installing and creating a new Lazo application is as easy as uno, dos, tres.

### Installation and Application Creation

To install Lazo execute the following command:

```shell
npm install -g lazo
```

Next [create](#) a new application:

```shell
lazo create application [target_directory/]application_directory_name
# omitting the target directory name will create the application directory in the cwd
```

Finally [start](#) the new application:

```shell
lazo start [target_directory/]application_directory_name
```

You are done.

To verify that the application is running open `http://localhost:8080` in a browser. You should
see the following:

INSERT_SCREEN_SHOT_HERE

### Creating a Weather Application