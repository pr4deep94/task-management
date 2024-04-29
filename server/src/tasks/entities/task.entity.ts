import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

export enum STATUS {
    pending = "pending",
    in_progress = "in_progress",
    done = "done",
}

@Entity()
export class Task {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.pending,
    })
    status: STATUS

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, nullable: true })
    updatedAt: Date;
}