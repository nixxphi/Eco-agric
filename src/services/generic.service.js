class GenericService {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(filter, data) {
        return await this.model.findOneAndUpdate(filter, data, { new: true })
        .select('-__v -updatedAt -deleted');
    }

    async delete(filter) {
        return await this.model.findOneAndDelete(filter);
    }

    async find(filter) {
        filter = { deleted: false, ...filter }
        return await this.model.findOne(filter)
        .select('-__v -updatedAt -deleted')
    }

    async search(filter) {
        const page = filter?.page ? parseInt(filter?.page) : 1;
        const perPage = filter?.limit ? parseInt(filter?.limit) : 0;
        
        delete filter?.page
        delete filter?.limit
    
        let data = [];
        let totalCount;
        
        if (filter) {
            filter = filter?.deleted ? filter : filter.hasOwnProperty('deleted') ? filter : { deleted: false, ...filter }
            
            totalCount = await this.model.countDocuments(filter);
            data = await this.model.find(filter)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .sort({ createdAt: -1 })
                .select('-__v -updatedAt -deleted');
        } else {
            totalCount = await this.model.countDocuments({ deleted: false });
            data = await this.model.find({ deleted: false})
                .skip((page - 1) * perPage)
                .limit(perPage)
                .sort({ createdAt: 1 })
                .select('-__v -updatedAt -deleted');
        }
        
        return {
            data,
            currentPage: page,
            totalPages: Math.ceil(totalCount / perPage)
        };
    }
}

export default GenericService;
